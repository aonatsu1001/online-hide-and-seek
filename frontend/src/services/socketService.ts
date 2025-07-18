/**
 * WebSocket通信を管理するモジュール（サンプル）
 */

// バックエンドのWebSocketサーバーに接続
const socket = new WebSocket('ws://localhost:8000/ws/game'); // URLは実際の環境に合わせてください

// 接続成功時の処理
socket.onopen = () => {
    console.log('Successfully connected to the WebSocket server.');
};

// サーバーからメッセージを受信した時の処理
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Message from server: ', message);
  // ここでサーバーからの指示に応じてUIを更新する処理などを書く
};

// エラー発生時の処理
socket.onerror = (error) => {
    console.error('WebSocket Error: ', error);
};

/**
 * 隠れる場所のIDをバックエンドに送信する関数
 * @param spotId - 選択された場所のID (string)
 */
export const sendHidingSpotId = (spotId: string) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = {
        event: 'set_hiding_spot', // イベント名は同じでOK
        data: {
            id: spotId, // 送信するデータをIDに変更
        },
        };
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected.');
    }
};