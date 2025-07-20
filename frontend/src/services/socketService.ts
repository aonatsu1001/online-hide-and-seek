let socket: WebSocket | null = null;
let onHidingSpotChosenCallback: ((spotId: string) => void) | null = null;
let onGameStartCallback: (() => void) | null = null;
let onRoleUpdateCallback: ((players: any) => void) | null = null;
let onGameResultCallback: ((result: any) => void) | null = null;

export const initSocket = (roomId: string) => {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(`ws://localhost:8000/ws/game/${roomId}`);

  socket.onopen = () => {
    console.log('Successfully connected to the WebSocket server.');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Message from server: ', message);

    if (message.event === 'hiding_spot_chosen' && onHidingSpotChosenCallback) {
      onHidingSpotChosenCallback(message.data.id);
    }

    if (message.event === 'game_start' && onGameStartCallback) {
      onGameStartCallback();
    }

    if (message.type === 'role_update' && onRoleUpdateCallback) {
      onRoleUpdateCallback(message.players);
    }


    if (message.event === 'game_result' && onGameResultCallback) {
        onGameResultCallback(message.data);
    }
};
}

export const registerHidingSpotChosenCallback = (callback: (spotId: string) => void) => {
  onHidingSpotChosenCallback = callback;
  return () => {
    onHidingSpotChosenCallback = null;
  };
};

export const registerGameStartCallback = (callback: () => void) => {
  onGameStartCallback = callback;
  return () => {
    onGameStartCallback = null;
  };
};

export const registerRoleUpdateCallback = (callback: (players: any) => void) => {
  onRoleUpdateCallback = callback;
  return () => {
    onRoleUpdateCallback = null;
  };
};

export const registerGameResultCallback = (callback: (result: any) => void) => {
    onGameResultCallback = callback;
    return () => {
        onGameResultCallback = null;
    };
};

// // エラー発生時の処理
// socket.onerror = (error) => {
//     console.error('WebSocket Error: ', error);
// };

/**
 * 隠れる場所のIDをバックエンドに送信する関数
 * @param spotId - 選択された場所のID (string)
 */

export const sendHidingSpotId = (spotId: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const message = {
      event: 'set_hiding_spot',
      data: {
        id: spotId,
      },
    };
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected.');
  }
};

export const sendGuess = (spotId: string) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = {
            event: 'guess',
            data: {
                id: spotId,
            },
        };
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected.');
    }
};
