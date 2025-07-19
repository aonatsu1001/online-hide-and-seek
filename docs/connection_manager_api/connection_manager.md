# ConnectionManagerクラス仕様書

## 概要
このドキュメントは、バックエンドのWebSocket接続を管理する`ConnectionManager`クラスの機能と使い方について記述します。このクラスは直接APIエンドポイントを提供するものではありませんが、リアルタイム通信を実装する上で重要な役割を果たします。

## クラス名
`ConnectionManager`

## ファイルパス
`backend/app/websocket/connection_manager.py`

## 機能

### 1. 接続管理
- **目的:** WebSocket接続の確立と切断を管理します。
- **内部構造:** ルームIDをキーとし、そのルームに属するアクティブなWebSocket接続のリストを値とする辞書 (`active_connections`) を保持します。

#### `connect(websocket: WebSocket, room_id: str)`
- **目的:** 新しいWebSocket接続を受け入れ、指定されたルームに追加します。
- **引数:**
    - `websocket` (WebSocket, 必須): 確立されたWebSocket接続オブジェクト。
    - `room_id` (string, 必須): 接続を関連付けるルームの一意のID。
- **動作:**
    1.  WebSocket接続を受け入れます (`await websocket.accept()`)。
    2.  指定された`room_id`に対応する接続リストにWebSocketを追加します。
    3.  コンソールに接続情報を出力します。

#### `disconnect(websocket: WebSocket, room_id: str)`
- **目的:** 指定されたWebSocket接続を、指定されたルームから削除します。
- **引数:**
    - `websocket` (WebSocket, 必須): 切断するWebSocket接続オブジェクト。
    - `room_id` (string, 必須): 切断する接続が属するルームの一意のID。
- **動作:**
    1.  指定された`room_id`の接続リストからWebSocketを削除します。
    2.  コンソールに切断情報を出力します。
    3.  もしルーム内の接続がすべてなくなった場合、そのルームのエントリを`active_connections`から削除します。

### 2. メッセージ送信

#### `send_personal_message(message: str, websocket: WebSocket)`
- **目的:** 特定のWebSocket接続に対してメッセージを送信します。
- **引数:**
    - `message` (string, 必須): 送信するテキストメッセージ。
    - `websocket` (WebSocket, 必須): メッセージを送信する対象のWebSocket接続オブジェクト。
- **動作:** 指定されたWebSocket接続にテキストメッセージを送信します。

#### `broadcast_to_room(message: str, room_id: str)`
- **目的:** 特定のルームに属するすべての接続中のクライアントにメッセージをブロードキャストします。
- **引数:**
    - `message` (string, 必須): 送信するテキストメッセージ。
    - `room_id` (string, 必須): メッセージをブロードキャストする対象のルームの一意のID。
- **動作:**
    1.  指定された`room_id`の接続リスト内のすべてのWebSocket接続に対してメッセージを送信します。
    2.  メッセージ送信中にエラーが発生した接続は、リストから削除されます。
    3.  ブロードキャスト後にルーム内の接続がすべてなくなった場合、そのルームのエントリを`active_connections`から削除します。

## 使用例 (バックエンドコード内)
このクラスは、FastAPIのWebSocketエンドポイント内で以下のように使用されます。

```python
from fastapi import WebSocket, WebSocketDisconnect, APIRouter
from backend.app.websocket.connection_manager import ConnectionManager

manager = ConnectionManager()
router = APIRouter()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_text()
            # 受信したメッセージをルーム内にブロードキャスト
            await manager.broadcast_to_room(f"Received: {data}", room_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket, room_id)
