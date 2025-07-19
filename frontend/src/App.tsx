import { useState } from 'react';
import './App.css';
import './styles/main.css';

// --- 各ページのコンポーネントをインポート ---
import LobbyPage from './pages/LobbyPage.tsx';
import RoleSelector from './components/RoleSelector.tsx';
// import GamePageHide from './pages/GamePage_hide.tsx';
// import GamePageSeek from './pages/GamePage_seek.tsx'; // こちらは鬼側の画面として今後作成

type PlayerRole = 'HIDER' | 'SEEKER';
type GameState = 'LOBBY' | 'ROLE_SELECT' | 'GAME_HIDE' | 'GAME_SEEK';

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [userRole, setUserRole] = useState<PlayerRole | null>(null);

  const handleMatchingComplete = () => {
    setGameState('ROLE_SELECT');
  };

  const handleRoleSelected = (role: PlayerRole) => {

    // 【追加】RoleSelectorから役割を受け取ったことをコンソールで確認
    console.log(`App.tsx: 役割「${role}」をRoleSelectorから受け取りました。`);
    
    setUserRole(role);
    if (role === 'HIDER') {
      setGameState('GAME_HIDE');
    } else {
      setGameState('GAME_SEEK');
    }
  };

  // 【追加】現在のゲーム状態に基づいてCSSクラス名を返す関数
  const getBackgroundClass = () => {
    // ゲーム中の画面（隠れる側 or 鬼側）の場合
    if (gameState === 'GAME_HIDE' || gameState === 'GAME_SEEK') {
      return 'in-game-background';
    }
    // それ以外（ロビー、役割選択）の場合
    return 'lobby-background';
  };

  const renderPage = () => {
    switch (gameState) {
      case 'LOBBY':
        return <LobbyPage onMatchingComplete={handleMatchingComplete} />;
      case 'ROLE_SELECT':
        return <RoleSelector onRoleSelected={handleRoleSelected} />;
      case 'GAME_HIDE':
        // return <GamePageHide />;
      case 'GAME_SEEK':
        return <div>鬼の画面を準備中です...</div>;
      default:
        return <LobbyPage onMatchingComplete={handleMatchingComplete} />;
    }
  };

  return (
    // 【変更】動的にクラス名が付与されるようにする
    <div className={`app-container ${getBackgroundClass()}`}>
      {renderPage()}
    </div>
  );
}

export default App;