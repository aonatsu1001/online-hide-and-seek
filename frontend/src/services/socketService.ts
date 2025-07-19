let socket: WebSocket | null = null;
let onHidingSpotChosenCallback: ((spotId: string) => void) | null = null;
let onGameStartCallback: (() => void) | null = null;
let onRoleUpdateCallback: ((players: any) => void) | null = null;

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
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error: ', error);
  };
};

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
