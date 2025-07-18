import React from 'react'
import ClickableSpot from '../ClickableSpot'
import './../../styles/stages.css' // ★ 新しいCSSファイルをインポート

// --- このコンポーネントが必要とするデータ（変更なし） ---
interface Stage1Props {
  selectedSpotId: string | null
  onSpotClick: (id: string) => void
  userIcon: string
}

// --- このステージで使う画像（変更なし） ---
import bookshelfImage from '../../assets/stage_elements/stage1/bookshelf.png'
import plantImage from '../../assets/stage_elements/stage1/plant.png'
import lampImage from '../../assets/stage_elements/stage1/lamp.png'
import callImage from '../../assets/stage_elements/stage1/call.png'
import webImage from '../../assets/stage_elements/stage1/web.png'
import mailImage from '../../assets/stage_elements/stage1/mail.png'
import hintImage from '../../assets/stage_elements/stage1/hint.png'
import presentImage from '../../assets/stage_elements/stage1/present.png'
import cameraImage from '../../assets/stage_elements/stage1/camera.png'
import heartImage from '../../assets/stage_elements/stage1/heart.png'
import memoImage from '../../assets/stage_elements/stage1/memo.png'

const Stage1: React.FC<Stage1Props> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
}) => {
  // 表示するアイテムのリストを定義
  const spots = [
    { id: 'bookshelf-left', src: bookshelfImage, alt: '本棚', height: '200px' },
    { id: 'plant-pot', src: plantImage, alt: '観葉植物', height: '100px' },
    { id: 'desk-lamp', src: lampImage, alt: '電気スタンド', height: '150px' },
    { id: 'call', src: callImage, alt: '電話', height: '180px' }, // ← 追加
    { id: 'web', src: webImage, alt: 'ウェブ', height: '150px' }, // ← 追加
    { id: 'hint', src: hintImage, alt: 'ヒント', height: '180px' },
    { id: 'mail', src: mailImage, alt: 'メール', height: '120px' },
    { id: 'present', src: presentImage, alt: 'プレゼント', height: '150px' },
    { id: 'camera', src: cameraImage, alt: 'カメラ', height: '120px' },
    { id: 'heart', src: heartImage, alt: 'ハート', height: '150px' },
    { id: 'memo', src: memoImage, alt: 'メモ', height: '150px' },
    // 他のアイテムもここに追加できます
  ]

  return (
    <div className="stage-layout">
      {/* 画面上部のコンテンツ */}
      <div className="stage-header">
        <h1>ハッカソン会場</h1>
        <p>隠れたい場所をクリックして選択してください。</p>
      </div>

      {/* 画面下部の自動スクロールコンテナ */}
      <div className="scrolling-tray-container">
        <div className="scrolling-tray">
          {/* 無限スクロールのために、リストを2回レンダリングする */}
          {[...spots, ...spots].map((spot, index) => (
            <div className="tray-item" key={`${spot.id}-${index}`}>
              <ClickableSpot
                id={spot.id}
                userIcon={userIcon}
                isSelected={selectedSpotId === spot.id}
                onClick={onSpotClick}
              >
                <img
                  src={spot.src}
                  alt={spot.alt}
                  style={{ height: spot.height }}
                />
              </ClickableSpot>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stage1
