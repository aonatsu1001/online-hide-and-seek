import React from 'react'
import './../styles/Sidebar.css'

// アイコンのインポート（実際に用意した画像に合わせてください）
import shoppingIcon from '../assets/icons/shopping.png'
import auctionIcon from '../assets/icons/auction.png'
import newsIcon from '../assets/icons/news.png'
// ... 他のアイコンもインポート

const Sidebar: React.FC = () => {
  // サイドバーに表示する項目のリスト
  const menuItems = [
    { name: 'ショッピング', icon: shoppingIcon, href: '#' },
    { name: 'オークション', icon: auctionIcon, href: '#' },
    { name: 'ニュース', icon: newsIcon, href: '#' },
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
