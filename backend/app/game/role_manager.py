# backend/api/game/role_manager.py

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List

# FastAPIアプリケーションインスタンスをここで生成
# これが 'app' として uvicorn に認識されます
app = FastAPI(
    title="Online Hide-and-Seek API (Role Manager)",
    description="API for role selection and management.",
    version="0.1.0",
)

# CORSミドルウェアの設定
# main.pyではなく、ここで直接FastAPIアプリに適用します
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# プレイヤー情報と接続管理
players: Dict[str, str] = {}  # 例: {'user1': 'HIDER'}
connections: List[WebSocket] = []

@app.post("/game/select-role") # パスに '/game' プレフィックスを直接含める
async def select_role(data: dict):
    username = data.get("username")
    role = data.get("role")
    if username and role in ["HIDER", "SEEKER"]:
        players[username] = role
        await broadcast_roles()
        return {"message": f"{username} が {role} を選択しました"}
    return {"error": "無効なデータです"}

@app.websocket("/game/ws") # パスに '/game' プレフィックスを直接含める
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
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Role Manager API!"}