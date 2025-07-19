import React from 'react'
import ClickableSpot from '../ClickableSpot'
import './../../styles/stage1.css' // cssファイル名を修正

// --- Propsの定義（変更なし） ---
interface Stage1Props {
  selectedSpotId: string | null
  onSpotClick: (id: string) => void
  userIcon: string
}

// --- 画像アセットのインポート（変更なし） ---
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
import manImage from '../../assets/stage_elements/stage1/man.png'
import docterImage from '../../assets/stage_elements/stage1/docter.png'
import washokuImage from '../../assets/stage_elements/stage1/washoku.png'
import rainImage from '../../assets/stage_elements/stage1/rain.png'

const Stage1: React.FC<Stage1Props> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
}) => {
  // ★ 全ての隠れ場所（装飾アイコン＋スクロール要素）を一つの配列に統合
  const allSpots = [
    { id: 'bookshelf-1', src: bookshelfImage, alt: '本棚1' },
    { id: 'plant-1', src: plantImage, alt: '観葉植物1' },
    { id: 'lamp-1', src: lampImage, alt: '電気スタンド1' },
    { id: 'call', src: callImage, alt: '電話' },
    { id: 'web', src: webImage, alt: 'ウェブ' },
    { id: 'mail', src: mailImage, alt: 'メール' },
    { id: 'hint', src: hintImage, alt: 'ヒント' },
    { id: 'present', src: presentImage, alt: 'プレゼント' },
    { id: 'camera', src: cameraImage, alt: 'カメラ' },
    { id: 'heart', src: heartImage, alt: 'ハート' },
    { id: 'memo', src: memoImage, alt: 'メモ' },
    { id: 'man', src: manImage, alt: '男性' },
    { id: 'docter', src: docterImage, alt: '医者' },
    { id: 'washoku', src: washokuImage, alt: '和食' },
    { id: 'rain', src: rainImage, alt: '雨' },
  ]

  return (
    <div className="stage-layout">
      {/* ★ 全ての隠れ場所をグリッド表示するコンテナ */}
      <div className="content-grid">
        {allSpots.map((spot) => (
          <div className="grid-item" key={spot.id}>
            <ClickableSpot
              id={spot.id}
              userIcon={userIcon}
              isSelected={selectedSpotId === spot.id}
              onClick={onSpotClick}
            >
              <img src={spot.src} alt={spot.alt} />
            </ClickableSpot>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stage1
