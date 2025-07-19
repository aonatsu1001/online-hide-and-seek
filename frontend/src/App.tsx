import React, { useState, useEffect } from 'react';
import { initSocket, registerGameStartCallback, registerRoleUpdateCallback } from './services/socketService';
import './App.css';
import './styles/main.css';

// --- 各ページのコンポーネントをインポート ---
import LobbyPage from './pages/LobbyPage.tsx';
import RoleSelector from './components/RoleSelector.tsx';
// 【追加】新しい4つのゲーム画面コンポーネントをインポート
import GamePageHideHidding from './pages/GamePage_hide_hidding';
import GamePageSeekHidding from './pages/GamePage_seek_hidding';
import GamePageHideSeeking from './pages/GamePage_hide_seeking';
import GamePageSeekSeeking from './pages/GamePage_seek_seeking';
import Loading from './components/Loading';


// 【変更】API仕様書に合わせて、役割の型を大文字に定義
type PlayerRole = 'HIDER' | 'SEEKER';
// 【変更】ゲームの状態をより詳細に定義
type GameState = 'LOBBY' | 'ROLE_SELECT' | 'HIDING_PHASE' | 'LOADING' | 'SEEKING_PHASE' | 'RESULT_PHASE';

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [userRole, setUserRole] = useState<PlayerRole | null>(null);
  const [hidingSpotId, setHidingSpotId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  // --- State更新関数 ---

  // マッチング完了 -> 役割選択へ
  const handleRoomJoined = (joinedRoomId: string, joinedUserId: string) => {
    setRoomId(joinedRoomId);
    setUsername(joinedUserId);
    initSocket(joinedRoomId); // WebSocket接続を初期化
    setGameState('ROLE_SELECT');
  };

  useEffect(() => {
    if (!username) return; // usernameが設定されるまで何もしない

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

  // 【追加】隠れる時間終了 -> ローディング画面へ
  const handleHidingTimeEnd = (spotId: string | null) => {
    console.log("App.tsx: 隠れる時間が終了しました。");
    setHidingSpotId(spotId);
    setGameState('LOADING');
  };

  // 探す側が隠れ場所IDを受け取った時の処理
  const handleHidingSpotChosen = (spotId: string) => {
    console.log(`App.tsx: 隠れ場所「${spotId}」を受け取りました。`);
    setHidingSpotId(spotId);
    setGameState('LOADING');
  };

  // hidingSpotIdが更新されたら、2秒後にSEEKING_PHASEに移行する
  useEffect(() => {
    if (gameState === 'LOADING' && hidingSpotId) {
      console.log('App.tsx: hidingSpotIdが設定されたため、6秒後に探す時間へ移行します。');
      const timer = setTimeout(() => {
        setGameState('SEEKING_PHASE');
      }, 1000); // 2秒間ローディング画面を表示
      return () => clearTimeout(timer);
    }
  }, [gameState, hidingSpotId]);

  // --- 表示するページの振り分け ---
  const renderPage = () => {
    switch (gameState) {
      case 'LOBBY':
        return <LobbyPage onRoomJoined={handleRoomJoined} />;
      
      case 'ROLE_SELECT':
        return <RoleSelector username={username} roomId={roomId} />;
      
      case 'HIDING_PHASE':
        if (userRole === 'HIDER') {
          return <GamePageHideHidding onTimeEnd={handleHidingTimeEnd} />;
        } else { // SEEKERの場合
          return <GamePageSeekHidding onHidingSpotChosen={handleHidingSpotChosen} />;
        }

      case 'LOADING':
        return <Loading />;

      case 'SEEKING_PHASE':
        if (userRole === 'HIDER') {
          return <GamePageHideSeeking hidingSpotId={hidingSpotId} userRole={userRole} />;
        } else { // SEEKERの場合
          return <GamePageSeekSeeking hidingSpotId={hidingSpotId} userRole={userRole} />;
        }

      default:
        return <LobbyPage onRoomJoined={handleRoomJoined} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );

}

export default App;