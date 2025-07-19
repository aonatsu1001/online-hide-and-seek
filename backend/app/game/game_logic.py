from fastapi import APIRouter, HTTPException
from typing import Dict

# 隠された場所のオブジェクトIDをルームごとに保存する辞書
# {room_id: "object_id"}
hidden_locations: Dict[str, str] = {}

router = APIRouter(
    prefix="/game_logic", # ゲームロジック関連のAPIとしてプレフィックスを設定
    tags=["Game Logic"]
)

@router.post("/set_hidden_location/{room_id}")
async def set_hidden_location(room_id: str, object_id: str): # x, y から object_id に変更
    """
    指定されたルームの隠された場所のオブジェクトIDを保存します。
    """
    if not room_id:
        raise HTTPException(status_code=400, detail="Room ID is required")

    hidden_locations[room_id] = object_id # 辞書の値を object_id に変更
    return {"message": f"Hidden location for room {room_id} set to object_id={object_id}"} # メッセージを更新
