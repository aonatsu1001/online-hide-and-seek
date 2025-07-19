import React, { useState } from 'react';
import '../styles/LobbyPage.css';

interface LobbyPageProps {
  onJoinRoom: (roomId: string) => void;
}

const LobbyPage = ({ onJoinRoom }: LobbyPageProps) => {
  const [roomId, setRoomId] = useState('');

  const handleJoin = () => {
    if (roomId.trim()) {
      onJoinRoom(roomId.trim());
    }
  };

  return (
    <div className="lobby-container">
      <h1>オンラインかくれんぼ</h1>
      <input
        type="text"
        placeholder="ルームIDを入力"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoin}>ルームに参加</button>
    </div>
  );
};

export default LobbyPage;
