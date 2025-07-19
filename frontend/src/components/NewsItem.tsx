import React from 'react'
import './../styles/NewsItem.css'

interface NewsItemProps {
  title: string
  source: string
  imageUrl: string
  href: string
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  source,
  imageUrl,
  href,
}) => {
  return (
    <a href={href} className="news-item-link">
      <article className="news-item">
        <div className="news-text-content">
          <h3>{title}</h3>
          <cite>{source}</cite>
        </div>
        <div className="news-image-container">
          <img src={imageUrl} alt={title} />
        </div>
      </article>
    </a>
  )
}

export default NewsItem
