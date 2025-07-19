import React from 'react'
import './../styles/DecorativeIcon.css'

// userIconをpropsに追加
interface DecorativeIconProps {
  id: string
  isSelected: boolean
  onClick: (id: string) => void
  imageUrl: string
  userIcon: string // ★ 追加
  top: string
  left: string
  size: string
  rotation?: number
}

const DecorativeIcon: React.FC<DecorativeIconProps> = ({
  id,
  isSelected,
  onClick,
  imageUrl,
  userIcon,
  top,
  left,
  size,
  rotation = 0,
}) => {
  const style: React.CSSProperties = {
    top,
    left,
    width: size,
    height: size,
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.2s', // ★ ホバーエフェクト用に transition を追加
  }

  const className = `decorative-icon ${isSelected ? 'selected' : ''}`

  // ★ isSelectedがtrueならuserIconを、falseなら元のimageUrlを表示する
  const currentImageSrc = isSelected ? userIcon : imageUrl

  return (
    <div
      className={className}
      style={style}
      onClick={() => onClick(id)}
      // ★ マウスホバーで拡大するイベントハンドラを追加
      onMouseOver={(e) => {
        if (!isSelected)
          e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.1)`
      }}
      onMouseOut={(e) =>
        (e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`)
      }
    >
      <img src={currentImageSrc} alt="decoration" />
    </div>
  )
}

export default DecorativeIcon
