from typing import Dict

# 隠された場所のオブジェクトIDをルームごとに保存する辞書
# {room_id: "object_id"}
hidden_locations: Dict[str, str] = {}

def set_hiding_spot_for_room(room_id: str, object_id: str):
    """
    指定されたルームの隠された場所のオブジェクトIDを保存します。
    """
    hidden_locations[room_id] = object_id
    print(f"Hidden location for room {room_id} set to object_id={object_id}")

def get_hiding_spot_for_room(room_id: str) -> str | None:
    """
    指定されたルームの隠された場所のオブジェクトIDを取得します。
    """
    return hidden_locations.get(room_id)

def clear_hiding_spot_for_room(room_id: str):
    """
    指定されたルームの隠された場所のオブジェクトIDをクリアします。
    """
    if room_id in hidden_locations:
        del hidden_locations[room_id]
        print(f"Hidden location for room {room_id} cleared.")
