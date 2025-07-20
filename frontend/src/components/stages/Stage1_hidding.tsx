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

const Stage1_hidding: React.FC<Stage1Props> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
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
      title: '知ってる？ぜんまいざむらいって根っからの良い人に見えるけど，最初からそうだったんじゃなくて元々泥棒で団子屋に盗みに入ろうとしてたんだよ．結局人間は変わろうと思えば変われるってことだよね',
      source: 'てかゼンマイで寿命がのびるってなんやねん',
      imageUrl: zenmaiImage,
      href: '#',
    },
    {
      id: 2,
      title: 'たまにドラマとかバラエティで見かける学校の屋上で全校生徒に自分の思いのたけをぶちまけるやつ，あれかなり緊張するし恥ずかしいのでは？屋上に行く人は勇気あるよね～．皆は何をぶちまける？',
      source: 'え，僕ですか？絶対にしません(笑)てかあっても話すことが思いつかない',
      imageUrl: kakuseiImage,
      href: '#',
    },
    {
      id: 3,
      title: '万年筆持ってる人ってすごい作家さんていうイメージがある．これはアニメとかでよく出てくるなあ．今はPCで書くのが主流だろうけど，昔の作家さんが袴着て机に向かって万年筆を握る姿は想像にたやすい',
      source: '編集者に原稿を急かされて何とかやり過ごそうとするところまで想像しちゃった...',
      imageUrl: mannenImage,
      href: '#',
    },
    {
      id: 4,
      title: '皆さんこのマークをみて真っ先に何を連想するだろうか？私の予想ではメールと手紙のどちらかだと思う．メールと答える人は若いかPCをよく使っているのかな？．一方で手紙と答える人は比較的昔の世代かも？',
      source: '生物の酵素？えーと...あなたは生物にとても精通している人ですね...',
      imageUrl: mailImage,
      href: '#',
    },
  ]

  // ★ このコンポーネント内での役割を 'HIDER' として定義する
  const userRole = 'HIDER'

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
            userRole={userRole} // ★ 定義したuserRoleを渡す
          />
          <main className="main-content" style={backgroundStyle}>
            <div className="content-grid">
              {allSpots.map((spot) => (
                <div className="grid-item" key={spot.id}>
                  <ClickableSpot
                    id={spot.id}
                    userIcon={userIcon}
                    isSelected={selectedSpotId === spot.id}
                    onClick={onSpotClick}
                    userRole={userRole} // ★ 定義したuserRoleを渡す
                  >
                    <img src={spot.src} alt={spot.alt} />
                  </ClickableSpot>
                </div>
              ))}
            </div>
            <div className="news-feed-container">
              {newsFeed.map((item) => (
                <NewsItem
                  key={item.id}
                  id={item.id.toString()}
                  isSelected={selectedSpotId === item.id.toString()}
                  onClick={onSpotClick}
                  userIcon={userIcon}
                  userRole={userRole} // ★ 定義したuserRoleを渡す
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

export default Stage1_hidding
