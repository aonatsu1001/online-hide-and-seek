import React from 'react';
import './../styles/ResultPage.css'; // あとで作成するCSSファイル

// このコンポーネントが受け取るデータの型を定義
interface ResultPageProps {
  result: 'found' | 'not_found' | null;
  userRole: 'HIDER' | 'SEEKER' | null;
  onReturnToLobby: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, userRole, onReturnToLobby }) => {
  // 自分の役割とゲーム結果から、勝ち負けを判定する
  const isWinner =
    (userRole === 'SEEKER' && result === 'found') ||
    (userRole === 'HIDER' && result !== 'found');

  const resultMessage = isWinner ? 'あなたの勝ち！' : 'あなたの負け...';
  const resultClass = isWinner ? 'win' : 'lose';

  return (
    <div className="result-page">
      <div className="result-container">
        <h1 className={`result-title ${resultClass}`}>{resultMessage}</h1>
        <button className="lobby-button" onClick={onReturnToLobby}>
          ロビーに戻る
        </button>
      </div>
    </div>
  );
};

export default ResultPage;