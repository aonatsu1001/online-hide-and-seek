import React from 'react'
import Header from '../Header'
import SearchBar from '../SearchBar'
import Sidebar from '../Sidebar'
import ClickableSpot from '../ClickableSpot'
import './../../styles/stage1.css'

// --- Propsの定義 ---
interface Stage1Props {
  selectedSpotId: string | null
  onSpotClick: (id: string) => void
  userIcon: string
}

// --- 画像アセットのインポート ---
import adoresuImage from '../../assets/stage_elements/stage1/adoresu.png'
import akazukinImage from '../../assets/stage_elements/stage1/akazukin.png'
import atama_lImage from '../../assets/stage_elements/stage1/atama_l.png'
import atama_rImage from '../../assets/stage_elements/stage1/atama_r.png'
import butaImage from '../../assets/stage_elements/stage1/buta.png'
import gamagutiImage from '../../assets/stage_elements/stage1/gamaguti.png'
import gyanguImage from '../../assets/stage_elements/stage1/gyangu.png'
import hakaseImage from '../../assets/stage_elements/stage1/hakase.png'
import hukumenImage from '../../assets/stage_elements/stage1/hukumen.png'
import kaizokuImage from '../../assets/stage_elements/stage1/kaizoku.png'
import ninjaImage from '../../assets/stage_elements/stage1/ninja.png'
import okaneImage from '../../assets/stage_elements/stage1/okane.png'
import opereImage from '../../assets/stage_elements/stage1/opere.png'
import washokuImage from '../../assets/stage_elements/stage1/washoku.png'
import teamImage from '../../assets/stage_elements/stage1/team.png'
import tetyouImage from '../../assets/stage_elements/stage1/tetyou.png'
// ★ 1. 背景画像をインポート
import backgroundImage from '../../assets/stage_elements/stage1/background.png'

const Stage1: React.FC<Stage1Props> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
}) => {
  // ★ 2. 背景画像を設定するためのスタイルオブジェクトを作成
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  // 全ての隠れ場所を一つの配列に統合
  const allSpots = [
    { id: 'adoresu', src: adoresuImage, alt: 'アドレス' },
    { id: 'akazukin', src: akazukinImage, alt: '赤ずきん' },
    { id: 'atama_l', src: atama_lImage, alt: '頭右' },
    { id: 'atama_r', src: atama_rImage, alt: '頭左' },
    { id: 'buta', src: butaImage, alt: '豚' },
    { id: 'gamaguti', src: gamagutiImage, alt: 'がま口' },
    { id: 'gyangu', src: gyanguImage, alt: 'ギャング' },
    { id: 'hakase', src: hakaseImage, alt: '博士' },
    { id: 'hukumen', src: hukumenImage, alt: '覆面' },
    { id: 'kaizoku', src: kaizokuImage, alt: '海賊' },
    { id: 'ninja', src: ninjaImage, alt: '忍者' },
    { id: 'okane', src: okaneImage, alt: 'お金' },
    { id: 'opere', src: opereImage, alt: 'オペレーター' },
    { id: 'washoku', src: washokuImage, alt: '和食' },
    { id: 'team', src: teamImage, alt: 'チーム' },
    { id: 'tetyou', src: tetyouImage, alt: '手帳' },
  ]

  return (
    <>
      <Header />
      <div className="stage-body">
        <SearchBar />
        <div className="content-wrapper">
          <Sidebar />
          {/* ★ 3. 作成したスタイルを main タグに適用 */}
          <main className="main-content" style={backgroundStyle}>
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
          </main>
        </div>
      </div>
    </>
  )
}

export default Stage1
