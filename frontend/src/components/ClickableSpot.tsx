import React from 'react'

interface ClickableSpotProps {
  id: string
  userIcon: string
  isSelected: boolean
  onClick: (id: string) => void
  // ★ childrenの型を、img要素のpropsを持つReact要素に限定する
  children: React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>
}

const ClickableSpot: React.FC<ClickableSpotProps> = ({
  id,
  userIcon,
  isSelected,
  onClick,
  children,
}) => {
  const content = isSelected
    ? // ★ 型が具体的になったので、`as React.ReactElement` という型アサーションが不要になる
      React.cloneElement(children, { src: userIcon, alt: 'Selected Spot' })
    : children

  const style: React.CSSProperties = {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    transition: 'transform 0.2s',
    outline: isSelected ? '3px solid #00A3FF' : 'none',
    outlineOffset: '2px',
    borderRadius: '8px',
  }

  return (
    <div
      style={style}
      onClick={() => onClick(id)}
      onMouseOver={(e) => {
        if (!isSelected) e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {content}
    </div>
  )
}

export default ClickableSpot
