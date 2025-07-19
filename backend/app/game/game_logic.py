from fastapi import APIRouter, HTTPException
from typing import Dict

# 隠された場所の座標をルームごとに保存する辞書
# {room_id: {"x": x_coord, "y": y_coord}}
hidden_locations: Dict[str, Dict[str, int]] = {}

router = APIRouter(
    prefix="/game_logic", # ゲームロジック関連のAPIとしてプレフィックスを設定
    tags=["Game Logic"]
)

@router.post("/set_hidden_location/{room_id}")
async def set_hidden_location(room_id: str, x: int, y: int):
    """
    指定されたルームの隠された場所の座標を保存します。
    """
    if not room_id:
        raise HTTPException(status_code=400, detail="Room ID is required")

    hidden_locations[room_id] = {"x": x, "y": y}
    return {"message": f"Hidden location for room {room_id} set to x={x}, y={y}"}
