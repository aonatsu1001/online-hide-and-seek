import React from 'react'
import './../styles/GameUI.css' // CSSファイル名も合わせる

// このコンポーネントが受け取るデータの型を定義
interface GameUIProps {
  timeRemaining: number
  guessesLeft: number
}

const GameUI: React.FC<GameUIProps> = ({ timeRemaining, guessesLeft }) => {
  // 時間を 分:秒 の形式にフォーマットする
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="game-ui">
      {' '}
      {/* CSSクラス名も合わせる */}
      <div className="ui-item">
        <span className="ui-label">のこり時間</span>
        <span className="ui-value">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="ui-item">
        <span className="ui-label">のこり回数</span>
        <span className="ui-value">{guessesLeft}</span>
      </div>
    </div>
  )
}

export default GameUI
