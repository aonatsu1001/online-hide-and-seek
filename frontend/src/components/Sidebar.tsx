import React from 'react'
import './../styles/Sidebar.css'
import ClickableSpot from './ClickableSpot' // ★ ClickableSpotをインポート

// --- Propsの定義 ---
// 親コンポーネントから渡してもらうデータを定義
interface SidebarProps {
  selectedSpotId: string | null
  onSpotClick: (id: string) => void
  userIcon: string
  userRole?: 'HIDER' | 'SEEKER' | null
}

// --- 画像アセットのインポート ---
import schoolIcon from '../assets/stage_elements/stage1/school.png'
import houseIcon from '../assets/stage_elements/stage1/house.png'
import onsenIcon from '../assets/stage_elements/stage1/onsen.png'
import touIcon from '../assets/stage_elements/stage1/tou.png'
import soccerIcon from '../assets/stage_elements/stage1/soccer.png'
import baseballIcon from '../assets/stage_elements/stage1/baseball.png'
import noteIcon from '../assets/stage_elements/stage1/note.png'
import penkiIcon from '../assets/stage_elements/stage1/penki.png'
import goodIcon from '../assets/stage_elements/stage1/good.png'
import gensiIcon from '../assets/stage_elements/stage1/gensi.png'
import bookIcon from '../assets/stage_elements/stage1/book.png'
import dougaIcon from '../assets/stage_elements/stage1/douga.png'

const Sidebar: React.FC<SidebarProps> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
  userRole,
}) => {
  const menuItems = [
    { id: 'sidebar-school', name: '学校', icon: schoolIcon },
    { id: 'sidebar-house', name: '家', icon: houseIcon },
    { id: 'sidebar-onsen', name: '温泉', icon: onsenIcon },
    { id: 'sidebar-tou', name: '塔', icon: touIcon },
    { id: 'sidebar-soccer', name: 'サッカースタジアム', icon: soccerIcon },
    { id: 'sidebar-baseball', name: '野球場', icon: baseballIcon },
    { id: 'sidebar-note', name: 'ノート', icon: noteIcon },
    { id: 'sidebar-penki', name: 'ペンキ', icon: penkiIcon },
    { id: 'sidebar-good', name: 'いいね', icon: goodIcon },
    { id: 'sidebar-gensi', name: '原子力発電所', icon: gensiIcon },
    { id: 'sidebar-book', name: '読書', icon: bookIcon },
    { id: 'sidebar-douga', name: '動画再生', icon: dougaIcon },
  ]

  return (
    <aside className="sidebar-container">
      <h3 className="sidebar-title">今週のトレンド</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {/* ★ aタグをClickableSpotコンポーネントに置き換える */}
            <div className="sidebar-item">
              <ClickableSpot
                id={item.id}
                userIcon={userIcon}
                isSelected={selectedSpotId === item.id}
                onClick={onSpotClick}
                userRole={userRole}
              >
                <img src={item.icon} alt={item.name} />
              </ClickableSpot>
              <span className="sidebar-item-name">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
