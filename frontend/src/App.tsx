import { useState } from 'react';
import './App.css';
import './styles/main.css';
import GamePage from './pages/GamePage';
import LobbyPage from './pages/LobbyPage.tsx';
import RoleSelector from './components/RoleSelector.tsx';

type GameState = 'ROLE_SELECT' | 'LOBBY' | 'GAME';

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');

  // マッチングが完了したときに呼び出される関数
  const handleMatchingComplete = () => {
    console.log("App: 切り替え指示を受け取りました！");
    setGameState('ROLE_SELECT');
  };

  // 【追加】役割が選択されたときに呼び出される関数
  const handleRoleSelected = () => {
    console.log("役割が決定！ゲーム画面に移動します。");
    // ゲームの状態を 'GAME' に更新する
    setGameState('GAME');
  };

  const renderPage = () => {
    switch (gameState) {
      case 'ROLE_SELECT':
        // 【変更】RoleSelectorに新しい関数を渡す
        return <RoleSelector onRoleSelected={handleRoleSelected} />;
      case 'LOBBY':
        return <LobbyPage onMatchingComplete={handleMatchingComplete} />;
      case 'GAME':
        return <GamePage />;
      default:
        return <LobbyPage onMatchingComplete={handleMatchingComplete} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;