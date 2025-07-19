import React, { useState, useEffect } from 'react';
import { connect, registerGameStartCallback, registerRoleUpdateCallback } from './services/socketService';
import './App.css';
import './styles/main.css';

// --- 各ページのコンポーネントをインポート ---
import LobbyPage from './pages/LobbyPage.tsx';
import RoleSelector from './components/RoleSelector.tsx';
// 【追加】新しい4つのゲーム画面コンポーネントをインポート
import GamePageHideHidding from './pages/GamePage_hide_hidding.tsx';
import GamePageSeekHidding from './pages/GamePage_seek_hidding.tsx';
import GamePageHideSeeking from './pages/GamePage_hide_seeking.tsx';
import GamePageSeekSeeking from './pages/GamePage_seek_seeking.tsx';


// 【変更】API仕様書に合わせて、役割の型を大文字に定義
type PlayerRole = 'HIDER' | 'SEEKER';
// 【変更】ゲームの状態をより詳細に定義
type GameState = 'LOBBY' | 'ROLE_SELECT' | 'HIDING_PHASE' | 'SEEKING_PHASE' | 'RESULT_PHASE';

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [userRole, setUserRole] = useState<PlayerRole | null>(null);
  const [hidingSpotId, setHidingSpotId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  // 各タブでユニークなユーザー名を生成
  const [username] = useState(`user_${Math.random().toString(36).substring(7)}`);

  // --- State更新関数 ---

  const handleJoinRoom = (newRoomId: string) => {
    setRoomId(newRoomId);
    connect(newRoomId); // WebSocketに接続
    setGameState('ROLE_SELECT');
  };

  useEffect(() => {
    const gameStartCleanup = registerGameStartCallback(() => {
      console.log('App.tsx: ゲーム開始の合図を受け取りました。隠れる時間へ移行します。');
      setGameState('HIDING_PHASE');
    });

    const roleUpdateCleanup = registerRoleUpdateCallback((players) => {
      if (players[username]) {
        setUserRole(players[username]);
      }
    });

    return () => {
      gameStartCleanup();
      roleUpdateCleanup();
    };
  }, [username]);

  // 【追加】隠れる時間終了 -> 探す時間へ
  const handleHidingTimeEnd = (spotId: string | null) => {
    console.log("App.tsx: 隠れる時間が終了しました。探す時間へ移行します。");
    setHidingSpotId(spotId);
    setGameState('SEEKING_PHASE');
  };

  // 探す側が隠れ場所IDを受け取った時の処理
  const handleHidingSpotChosen = (spotId: string) => {
    console.log(`App.tsx: 隠れ場所「${spotId}」を受け取りました。探す時間へ移行します。`);
    setHidingSpotId(spotId);
    setGameState('SEEKING_PHASE');
  };

  // 【変更】現在のゲーム状態に基づいてCSSクラス名を返す関数
  const getBackgroundClass = () => {
    // ゲーム中の画面（隠れる時間、探す時間など）の場合
    if (gameState === 'HIDING_PHASE' || gameState === 'SEEKING_PHASE' || gameState === 'RESULT_PHASE') {
      return 'in-game-background';
    }
    // それ以外（ロビー、役割選択）の場合
    return 'lobby-background';
  };

  // --- 表示するページの振り分け ---
  const renderPage = () => {
    switch (gameState) {
      case 'LOBBY':
        return <LobbyPage onJoinRoom={handleJoinRoom} />;
      
      case 'ROLE_SELECT':
        return <RoleSelector username={username} roomId={roomId} />;
      
      case 'HIDING_PHASE':
        if (userRole === 'HIDER') {
          // ★「隠れる側」を選択した場合は、完成しているコンポーネントを表示
          return <GamePageHideHidding onTimeEnd={handleHidingTimeEnd} />;
        } else { // SEEKERの場合
          return <GamePageSeekHidding onHidingSpotChosen={handleHidingSpotChosen} />;
        }

      case 'SEEKING_PHASE':
        if (userRole === 'HIDER') {
          return <GamePageHideSeeking hidingSpotId={hidingSpotId} userRole={userRole} />;
        } else { // SEEKERの場合
          return <GamePageSeekSeeking hidingSpotId={hidingSpotId} userRole={userRole} />;
        }

      default:
        return <div>エラーが発生しました。</div>;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;
