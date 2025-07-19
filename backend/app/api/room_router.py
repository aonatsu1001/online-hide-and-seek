from fastapi import APIRouter, HTTPException
from typing import Dict, List
import random

# 仮のデータベース
rooms: Dict[str, List[str]] = {} # {room_id: [user_id1, user_id2, ...]}

router = APIRouter()

def generate_unique_room_id():
    """4桁のユニークなルームIDを生成する"""
    while True:
        room_id = f"{random.randint(0, 9999):04d}"
        if room_id not in rooms:
            return room_id

@router.post("/create_room")
async def create_room():
    room_id = generate_unique_room_id()
    rooms[room_id] = []
    return {"room_id": room_id}

@router.post("/join_room/{room_id}")
async def join_room(room_id: str, data: dict):
    user_id = data.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    if room_id not in rooms:
        raise HTTPException(status_code=404, detail="Room not found")
    rooms[room_id].append(user_id)
    return {"message": f"User {user_id} joined room {room_id}"}

@router.post("/start_matching")
async def start_matching(user_id: str):
    # ここではシンプルなマッチングロジックを仮定
    # 実際には、待機中のユーザーをキューに入れ、2人揃ったらルームを作成するなどのロジックが必要
    # この例では、単にユーザーがマッチングを開始したことを示す
    return {"message": f"User {user_id} started matching. Waiting for another player..."}
