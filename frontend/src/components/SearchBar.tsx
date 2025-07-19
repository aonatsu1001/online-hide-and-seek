import React from 'react'
import './../styles/SearchBar.css'

const SearchBar: React.FC = () => {
  return (
    <div className="search-container">
      <div className="search-tabs">
        <a href="#" className="active">
          ウェブ
        </a>
        <a href="#">画像</a>
        <a href="#">動画</a>
        <a href="#">知恵袋</a>
        <a href="#">地図</a>
        <a href="#">リアルタイム</a>
        <a href="#">一覧▼</a>
      </div>
      <div className="search-box">
        <input type="text" className="search-input" />
        <button className="search-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>検索</span>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
