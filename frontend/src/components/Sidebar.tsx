import React from 'react'
import './../styles/Sidebar.css'

// アイコンのインポート（実際に用意した画像に合わせてください）
import schoolIcon from '../assets/stage_elements/stage1/school.png'
import houseIcon from '../assets/stage_elements/stage1/house.png'
import onsenIcon from '../assets/stage_elements/stage1/onsen.png'
import touIcon from '../assets/stage_elements/stage1/tou.png'
import soccerIcon from '../assets/stage_elements/stage1/soccer.png'
import baseballIcon from '../assets/stage_elements/stage1/baseball.png'
import noteIcon from '../assets/stage_elements/stage1/note.png'
import penkiIcon from '../assets/stage_elements/stage1/penki.png'
// ... 他のアイコンもインポート

const Sidebar: React.FC = () => {
  // サイドバーに表示する項目のリスト
  const menuItems = [
    { name: '学校', icon: schoolIcon, href: '#' },
    { name: '家', icon: houseIcon, href: '#' },
    { name: '温泉', icon: onsenIcon, href: '#' },
    { name: '塔', icon: touIcon, href: '#' },
    { name: 'サッカースタジアム', icon: soccerIcon, href: '#' },
    { name: '野球場', icon: baseballIcon, href: '#' },
    { name: 'ノート', icon: noteIcon, href: '#' },
    { name: 'ペンキ', icon: penkiIcon, href: '#' },
    // 他の項目もここに追加
  ]

  return (
    <aside className="sidebar-container">
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <a href={item.href}>
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
