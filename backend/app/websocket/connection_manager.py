from typing import Dict, List
from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        # ルームIDをキーとし、そのルームに属するWebSocketのリストを値とする
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)
        print(f"User connected to room {room_id}. Total connections in room: {len(self.active_connections[room_id])}")

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_connections and websocket in self.active_connections[room_id]:
            self.active_connections[room_id].remove(websocket)
            print(f"User disconnected from room {room_id}. Remaining connections in room: {len(self.active_connections[room_id])}")
            if not self.active_connections[room_id]: # ルームに誰もいなくなったらルームを削除
                del self.active_connections[room_id]
                print(f"Room {room_id} is now empty and removed.")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast_to_room(self, message: str, room_id: str):
        if room_id not in self.active_connections:
            print(f"Attempted to broadcast to non-existent room: {room_id}")
            return # ルームが存在しない場合は何もしない

        disconnected_connections = []
        for connection in self.active_connections[room_id]:
            try:
                await connection.send_text(message)
            except RuntimeError as e:
                print(f"Failed to send to WebSocket (RuntimeError): {e}. Removing connection.")
                disconnected_connections.append(connection)
            except Exception as e:
                print(f"Failed to send to WebSocket (Other Error): {e}. Removing connection.")
                disconnected_connections.append(connection)
        
        # 切断されたコネクションをリストから削除
        for conn in disconnected_connections:
            if conn in self.active_connections[room_id]:
                self.active_connections[room_id].remove(conn)
        
        if not self.active_connections[room_id]: # ルームに誰もいなくなったらルームを削除
            del self.active_connections[room_id]
            print(f"Room {room_id} is now empty and removed after broadcast cleanup.")
