import React, { useState, useEffect } from 'react';
// CSSのパスが正しいか確認してください (例: '../styles/LobbyPage.css')
import '../styles/LobbyPage.css';

// 親から受け取るpropsの型を定義
interface LobbyPageProps {
  onMatchingComplete: () => void;
}

const LobbyPage: React.FC<LobbyPageProps> = ({ onMatchingComplete }) => {
  const [isMatched, setIsMatched] = useState(false);

  const statusMessage = isMatched
    ? '対戦相手が見つかりました！'
    : '対戦相手を探しています…';

  useEffect(() => {
    // 4秒後にマッチングが完了したと見なすタイマー
    const matchTimer = setTimeout(() => {
      console.log('対戦相手を発見！');
      setIsMatched(true);

      // マッチング完了メッセージを表示した後、1.5秒待ってから画面を切り替える
      const transitionTimer = setTimeout(() => {
        // 親から渡された関数をここで呼び出す！
        console.log('LobbyPage: 画面を切り替えます！');
        onMatchingComplete();
      }, 1500);

      return () => clearTimeout(transitionTimer);
    }, 4000);
    
    return () => clearTimeout(matchTimer);
  }, [onMatchingComplete]); // onMatchingCompleteが変更されたら再実行

  return (
    <div className="lobby-container">
      <h2 className="lobby-title">対戦待機中</h2>
      <p className="lobby-status">{statusMessage}</p>
      
      {/* (中略) players-boxの表示部分は変更なし */}
      <div className="players-box">
        {/* ... */}
      </div>

      {isMatched && (
        <p className="start-message">まもなく役割選択に移動します…</p>
      )}
    </div>
  );
};

export default LobbyPage;