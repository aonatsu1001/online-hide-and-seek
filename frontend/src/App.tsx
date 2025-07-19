import { useState } from 'react';
import './App.css';
import './styles/main.css';

// --- 各ページのコンポーネントをインポート ---
import LobbyPage from './pages/LobbyPage.tsx';
import RoleSelector from './components/RoleSelector.tsx';
// 【追加】新しい4つのゲーム画面コンポーネントをインポート
import GamePageHideHidding from './pages/GamePage_hide_hidding.tsx';
// import GamePageSeekHidding from './pages/GamePage_seek_hidding.tsx';
// import GamePageHideSeeking from './pages/GamePage_hide_seeking.tsx';
// import GamePageSeekSeeking from './pages/GamePage_seek_seeking.tsx';


// 【変更】API仕様書に合わせて、役割の型を大文字に定義
type PlayerRole = 'HIDER' | 'SEEKER';
// 【変更】ゲームの状態をより詳細に定義
type GameState = 'LOBBY' | 'ROLE_SELECT' | 'HIDING_PHASE' | 'SEEKING_PHASE' | 'RESULT_PHASE';

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [userRole, setUserRole] = useState<PlayerRole | null>(null);

  // --- State更新関数 ---

  // マッチング完了 -> 役割選択へ
  const handleMatchingComplete = () => {
    setGameState('ROLE_SELECT');
  };

  // 役割選択完了 -> 隠れる時間へ
  const handleRoleSelected = (role: PlayerRole) => {
    console.log(`App.tsx: 役割「${role}」を受け取りました。隠れる時間へ移行します。`);
    setUserRole(role);
    setGameState('HIDING_PHASE'); // ★ 最初のゲームフェーズは「隠れる時間」
  };

  // 【追加】隠れる時間終了 -> 探す時間へ
  const handleHidingTimeEnd = () => {
    console.log("App.tsx: 隠れる時間が終了しました。探す時間へ移行します。");
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
        return <LobbyPage onMatchingComplete={handleMatchingComplete} />;
      
      case 'ROLE_SELECT':
        return <RoleSelector onRoleSelected={handleRoleSelected} />;
      
      case 'HIDING_PHASE':
        if (userRole === 'HIDER') {
          // ★「隠れる側」を選択した場合は、完成しているコンポーネントを表示
          return <GamePageHideHidding onTimeEnd={handleHidingTimeEnd} />;
        } else { // SEEKERの場合
          // 【修正】未完成のコンポーネントの代わりに準備中のメッセージを表示
          return <div>鬼の画面（隠れる時間）は準備中です...</div>;
        }

      case 'SEEKING_PHASE':
         // 【修正】このフェーズはまだ両方とも未完成のため、準備中のメッセージを表示
        return <div>探す時間の画面は準備中です...</div>;

      default:
        return <LobbyPage onMatchingComplete={handleMatchingComplete} />;
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      {renderPage()}
    </div>
  );
}

