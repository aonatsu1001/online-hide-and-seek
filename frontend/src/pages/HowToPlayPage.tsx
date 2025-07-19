import React from 'react'
import '../styles/HowToPlayPage.css'

interface HowToPlayPageProps {
  onBack: () => void
}

const HowToPlayPage: React.FC<HowToPlayPageProps> = ({ onBack }) => {
  return (
    <div className="how-to-play-container">
      <h1>あそびかた</h1>
      <div className="rules-section">
        <h2>【隠れる人 (HIDER)】</h2>
        <p>
          ステージ上の好きなアイコンをクリックして隠れよう！制限時間内に「ここに隠れる」ボタンを押して場所を確定だ！
        </p>
      </div>
      <div className="rules-section">
        <h2>【探す人 (SEEKER)】</h2>
        <p>
          相手が隠れていそうなアイコンをクリックして探そう！チャンスは3回まで！時間切れになる前に見つけ出せ！
        </p>
      </div>

      {/* ★ タイトルに戻るボタンとロジック */}
      <button className="back-button" onClick={onBack}>
        タイトルに戻る
      </button>
    </div>
  )
}

export default HowToPlayPage
