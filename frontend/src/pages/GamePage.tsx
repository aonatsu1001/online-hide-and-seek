import React, { useState, useEffect } from 'react'

// 作成したコンポーネントをインポートする
import Stage from '../components/Stage'
import GameUI from '../components/GameUI' // GameHUDからGameUIに変更

// 用意したステージ画像をインポートする
import stage1Background from '../assets/images/background.png'

const GamePage: React.FC = () => {
  // --- 状態管理（仮データ）---
  const [timeRemaining, setTimeRemaining] = useState(300)
  const [guessesLeft, setGuessesLeft] = useState(5)
  const [currentStageImage] = useState(stage1Background)

  // --- 動作確認用のタイマー ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // --- レンダリング ---
  return (
    <div>
      {/* 呼び出すコンポーネントをGameUIに変更 */}
      <GameUI timeRemaining={timeRemaining} guessesLeft={guessesLeft} />
      <Stage stageImageUrl={currentStageImage} />
    </div>
  )
}

export default GamePage
