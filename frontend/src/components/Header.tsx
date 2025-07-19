import React from 'react'
import './../styles/Header.css' // これから作成するCSSファイルをインポート

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">オンラインかくれんぼ</div>
      <nav className="navigation-menu">
        <a href="#">五右衛門の強み</a>
        <span className="divider">|</span> {/* ← 区切り線 */}
        <a href="#">五右衛門の仕事</a>
        <span className="divider">|</span> {/* ← 区切り線 */}
        <a href="#">ブログ・ニュース</a>
        <span className="divider">|</span> {/* ← 区切り線 */}
        <a href="#">企業概要</a>
        <span className="divider">|</span> {/* ← 区切り線 */}
        <a href="#">ご相談の流れ</a>
        <a href="#" className="contact-button">
          お問い合わせ・相談
          {/* ↓ ボタン内の矢印アイコン ↓ */}
          <span className="arrow-icon">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </nav>
    </header>
  )
}

export default Header
