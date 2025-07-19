# ゲームロジック - 隠れ場所の決定と通知 (WebSocket通信)

## 概要
このドキュメントは、オンラインかくれんぼゲームにおける隠れ場所の決定と通知に関するWebSocket通信の仕様を記述します。この機能は、隠れる側のプレイヤーが隠れ場所を選択し、その情報が探す側のプレイヤーに通知されるプロセスを扱います。

## WebSocketエンドポイント
`ws://localhost:8000/ws/game`

このエンドポイントは、ゲームセッションのWebSocket通信に使用されます。`{room_id}` は接続時にパスパラメータとして提供されます。

## メッセージ形式
すべてのメッセージはJSON形式でやり取りされます。基本的な形式は以下の通りです。

```json
{
  "event": "イベント名",
  "data": { ... }
}
```

## イベントフロー

### 1. 隠れる側 → サーバー (隠れ場所の決定)
隠れる側のプレイヤーが隠れ場所を決定すると、フロントエンドは以下のメッセージをWebSocket経由で送信します。

- **イベント名**: `set_hiding_spot`
- **データ**: `{ "id": "選択された場所のID" }`
- **メッセージ例**:
  ```json
  {
    "event": "set_hiding_spot",
    "data": {
      "id": "bookshelf-left"
    }
  }
  ```
サーバーはこのメッセージを受け取ると、対応するゲームセッションの隠れ場所としてIDを保存します。

### 2. サーバー → 探す側 (隠れ場所の通知)
サーバーは隠れ場所IDを受け取ったら、同じゲームセッションの探す側のプレイヤーに以下のメッセージをWebSocket経由で送信します。

- **イベント名**: `hiding_spot_chosen`
- **データ**: `{ "id": "隠された場所のID" }`
- **メッセージ例**:
  ```json
  {
    "event": "hiding_spot_chosen",
    "data": {
      "id": "bookshelf-left"
    }
  }
  ```
フロントエンドの `GamePage_seek_hidding` はこのメッセージを待ち受け、受信次第 `GamePage_seek_seeking` へ遷移するトリガーとなります。

## 関連するバックエンドファイル
- `backend/app/game/game_logic.py`: 隠れ場所のIDを保存・取得するロジックを管理します。
- `backend/app/game/role_manager.py`: WebSocket接続の管理と、`set_hiding_spot` イベントの受信、`hiding_spot_chosen` イベントのブロードキャストを処理します。
