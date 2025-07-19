import React from 'react'
import Header from '../Header'
import SearchBar from '../SearchBar'
import Sidebar from '../Sidebar'
import ClickableSpot from '../ClickableSpot'
import NewsItem from '../NewsItem'
import '../../styles/stage1.css'

// --- Propsの定義 ---
interface Stage1Props {
  selectedSpotId: string | null
  onSpotClick: (id: string) => void
  userIcon: string
  hidingSpotId: string | null
  userRole: 'HIDER' | 'SEEKER' | null
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
import backgroundImage from '../../assets/stage_elements/stage1/background.png'
import zenmaiImage from '../../assets/stage_elements/stage1/zenmai.png'
import kakuseiImage from '../../assets/stage_elements/stage1/kakusei.png'
import mannenImage from '../../assets/stage_elements/stage1/mannen.png'
import mailImage from '../../assets/stage_elements/stage1/mail.png'

const Stage1_seeking: React.FC<Stage1Props> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
  hidingSpotId,
  userRole,
}) => {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

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

  const newsFeed = [
    {
      id: 1,
      title: '体重「51キロ」のアンゴラ村長 変ぼうした現在の姿',
      source: 'スポーツ報知',
      imageUrl: zenmaiImage,
      href: '#',
    },
    {
      id: 2,
      title: '妊娠中の中川翔子、セブ島での水着姿に反響',
      source: 'ABEMA TIMES',
      imageUrl: kakuseiImage,
      href: '#',
    },
    {
      id: 3,
      title: '和田アキ子「恒例のって言ったら変だけど」手術を受けたと明かす',
      source: 'スポニチアネックス',
      imageUrl: mannenImage,
      href: '#',
    },
    {
      id: 4,
      title: '50歳女優、写真添え『わが家の三女』との別れを報告',
      source: '中日スポーツ',
      imageUrl: mailImage,
      href: '#',
    },
  ]

  return (
    <>
      <Header />
      <div className="stage-body">
        <SearchBar />
        <div className="content-wrapper">
          <Sidebar
            selectedSpotId={selectedSpotId}
            onSpotClick={onSpotClick}
            userIcon={userIcon}
            userRole={userRole}
          />
          <main className="main-content" style={backgroundStyle}>
            <div className="content-grid">
              {allSpots.map((spot) => {
                return (
                  <div
                    className="grid-item"
                    key={spot.id}
                    style={
                      selectedSpotId === spot.id
                        ? {
                            border: '4px solid #ffde59',
                            borderRadius: '10px',
                            padding: '5px',
                            backgroundColor: 'rgba(255, 222, 89, 0.2)',
                          }
                        : { border: '4px solid transparent' }
                    }
                  >
                    <ClickableSpot
                      id={spot.id}
                      userIcon={userIcon}
                      isSelected={selectedSpotId === spot.id}
                      onClick={onSpotClick}
                      userRole={userRole}
                      hidingSpotId={hidingSpotId}
                    >
                      {/* ★★★ 常に元のアイコン画像を表示するように修正 ★★★ */}
                      <img src={spot.src} alt={spot.alt} />
                    </ClickableSpot>
                  </div>
                )
              })}
            </div>
            <div className="news-feed-container">
              {newsFeed.map((item) => (
                <NewsItem
                  key={item.id}
                  id={item.id.toString()} // ★ IDを渡す
                  isSelected={selectedSpotId === item.id.toString()} // ★ 選択状態を渡す
                  onClick={onSpotClick} // ★ クリック処理を渡す
                  userIcon={userIcon} // ★ ユーザーアイコンを渡す
                  userRole={userRole} // ★ 役割を渡す
                  title={item.title}
                  source={item.source}
                  imageUrl={item.imageUrl}
                  href={item.href}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Stage1_seeking
