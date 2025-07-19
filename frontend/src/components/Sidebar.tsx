import React from 'react'
import './../styles/Sidebar.css'

// アイコンのインポート（実際に用意した画像に合わせてください）
import carIcon from '../assets/stage_elements/stage1/car.png'
import mapIcon from '../assets/stage_elements/stage1/map.png'
import bikeIcon from '../assets/stage_elements/stage1/bike.png'
// ... 他のアイコンもインポート

const Sidebar: React.FC = () => {
  // サイドバーに表示する項目のリスト
  const menuItems = [
    { name: '車', icon: carIcon, href: '#' },
    { name: '地図', icon: mapIcon, href: '#' },
    { name: 'バイク', icon: bikeIcon, href: '#' },
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
