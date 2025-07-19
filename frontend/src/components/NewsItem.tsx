import React from 'react'
import './../styles/NewsItem.css'
import ClickableSpot from './ClickableSpot' // ★ ClickableSpotをインポート

// Propsの定義を更新
interface NewsItemProps {
  id: string
  isSelected: boolean
  onClick: (id: string) => void
  userIcon: string
  userRole?: 'HIDER' | 'SEEKER' | null
  title: string
  source: string
  imageUrl: string
  href: string
}

const NewsItem: React.FC<NewsItemProps> = ({
  id,
  isSelected,
  onClick,
  userIcon,
  userRole,
  title,
  source,
  imageUrl,
  href,
}) => {
  return (
    // ★ aタグに戻し、onClickを削除
    <a href={href} className="news-item-link">
      <article className="news-item">
        <div className="news-text-content">
          <h3>{title}</h3>
          <cite>{source}</cite>
        </div>
        <div className="news-image-container">
          {/* ★ 画像部分をClickableSpotで囲む */}
          <ClickableSpot
            id={id}
            userIcon={userIcon}
            isSelected={isSelected}
            onClick={onClick}
            userRole={userRole}
          >
            <img src={imageUrl} alt={title} className="original-image" />
          </ClickableSpot>
        </div>
      </article>
    </a>
  )
}

export default NewsItem
