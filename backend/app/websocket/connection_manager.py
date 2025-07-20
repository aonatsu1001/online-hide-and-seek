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

    async def send_to_role(self, message: str, room_id: str, role: str, rooms_players: Dict[str, Dict[str, str]]):
        if room_id not in self.active_connections or room_id not in rooms_players:
            print(f"Attempted to send to role in non-existent room: {room_id}")
            return

        # このルームで指定された役割を持つユーザー名を取得
        players_with_role = [username for username, r in rooms_players[room_id].items() if r == role]
        
        if not players_with_role:
            print(f"No players with role '{role}' found in room {room_id}")
            return

        # active_connectionsはWebSocketオブジェクトのリストなので、
        # どのWebSocketがどのユーザーに対応するかを特定する必要があります。
        # ここでは、簡単化のため、ルーム内の全接続に送ってしまい、フロント側で役割を判断してもらいます。
        # より厳密に実装するには、接続時にユーザー名を紐付ける必要があります。
        await self.broadcast_to_room(message, room_id)
