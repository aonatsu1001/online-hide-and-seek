from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, List

# プレイヤー情報と接続管理
players: Dict[str, str] = {}  # 例: {'user1': 'HIDER'}
connections: List[WebSocket] = []

router = APIRouter(
    prefix="/game", # /game プレフィックスをルーターに設定
    tags=["Game Role Management"]
)

@router.post("/select-role") # ルーターにプレフィックスを設定したので、ここでは /select-role
async def select_role(data: dict):
    username = data.get("username")
    role = data.get("role")
    if username and role in ["HIDER", "SEEKER"]:
        players[username] = role
        await broadcast_roles()
        return {"message": f"{username} が {role} を選択しました"}
    return {"error": "無効なデータです"}

@router.websocket("/ws") # ルーターにプレフィックスを設定したので、ここでは /ws
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        await send_roles(websocket)
        while True:
            # クライアントからのメッセージを受信するループ。
            # 特定の処理がなければ、接続維持のために待機
            await websocket.receive_text()
    except WebSocketDisconnect:
        print(f"WebSocket disconnected: {websocket}")
        connections.remove(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        if websocket in connections:
            connections.remove(websocket)


async def send_roles(websocket: WebSocket):
    await websocket.send_json(players)

async def broadcast_roles():
    disconnected_connections = []
    for conn in connections:
        try:
            await conn.send_json(players)
        except RuntimeError as e:
            print(f"Failed to send to WebSocket (RuntimeError): {e}. Removing connection.")
            disconnected_connections.append(conn)
        except Exception as e:
            print(f"Failed to send to WebSocket (Other Error): {e}. Removing connection.")
            disconnected_connections.append(conn)
    
    # 切断されたコネクションをリストから削除
    for conn in disconnected_connections:
        if conn in connections:
            connections.remove(conn)

# ルートパスにアクセスした際のメッセージ (オプション)
@router.get("/")
async def read_root():
    return {"message": "Welcome to the Role Manager API!"}
