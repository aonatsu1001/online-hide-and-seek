import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from typing import Dict, List
from backend.app.websocket.connection_manager import ConnectionManager
from backend.app.game.game_logic import set_hiding_spot_for_room, get_hiding_spot_for_room

# プレイヤー情報 (ルームごとに管理)
# {room_id: {username: role}}
rooms_players: Dict[str, Dict[str, str]] = {}

# ConnectionManagerのインスタンスを生成
manager = ConnectionManager()

router = APIRouter(
    prefix="/game",
    tags=["Game Role Management"]
)

@router.post("/select-role")
async def select_role(data: dict):
    username = data.get("username")
    role = data.get("role")
    room_id = data.get("room_id") # room_idもリクエストボディから受け取る
    
    if not room_id or room_id not in rooms_players:
        return {"error": "無効なルームIDです"}

    if username and role in ["HIDER", "SEEKER"]:
        rooms_players[room_id][username] = role
        # 役割が更新されたことをルーム内の全クライアントにブロードキャスト
        await manager.broadcast_to_room(json.dumps({'type': 'role_update', 'players': rooms_players[room_id]}), room_id)
        return {"message": f"{username} が {role} を選択しました (ルーム: {room_id})"}
    return {"error": "無効なデータです"}

@router.websocket("/ws/{room_id}") # room_idをパスパラメータとして受け取る
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    # ルームが存在しない場合は、WebSocket接続を拒否するか、ここでルームを作成する
    # 現時点では、room_routerでルームが作成されていることを前提とする
    if room_id not in rooms_players:
        rooms_players[room_id] = {} # 新しいルームのプレイヤー辞書を初期化

    await manager.connect(websocket, room_id) # ConnectionManagerを使って接続、room_idを渡す
    try:
        # 接続時に現在の役割情報を送信
        await manager.send_personal_message(json.dumps({'type': 'role_update', 'players': rooms_players[room_id]}), websocket)
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
                event_type = message.get("event")
                event_data = message.get("data")

                if event_type == "set_hiding_spot":
                    hiding_spot_id = event_data.get("id")
                    if hiding_spot_id:
                        set_hiding_spot_for_room(room_id, hiding_spot_id)
                        # 隠れ場所が設定されたことを探す側に通知
                        hiding_spot_chosen_message = {
                            "event": "hiding_spot_chosen",
                            "data": {"id": hiding_spot_id}
                        }
                        await manager.broadcast_to_room(json.dumps(hiding_spot_chosen_message), room_id)
                        print(f"Broadcasted hiding_spot_chosen for room {room_id} with ID: {hiding_spot_id}")
                    else:
                        print(f"Received set_hiding_spot event without 'id' in data: {message}")
                else:
                    # その他のメッセージは既存のブロードキャストロジックで処理
                    await manager.broadcast_to_room(json.dumps({'type': 'message', 'content': message, 'room_id': room_id}), room_id)
            except json.JSONDecodeError:
                print(f"Received non-JSON message: {data}")
                # 非JSONメッセージもそのままブロードキャストする（必要であれば）
                await manager.broadcast_to_room(json.dumps({'type': 'message', 'content': data, 'room_id': room_id}), room_id)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id) # ConnectionManagerを使って切断、room_idを渡す
        print(f"WebSocket disconnected: {websocket} from room {room_id}")
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket, room_id) # エラー時も切断

# ルートパスにアクセスした際のメッセージ (オプション)
@router.get("/")
async def read_root():
    return {"message": "Welcome to the Role Manager API!"}
