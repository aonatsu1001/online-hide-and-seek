import React from 'react'

interface ClickableSpotProps {
  id: string
  userIcon: string
  isSelected: boolean
  onClick: (id: string) => void
  children: React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>
  userRole?: 'HIDER' | 'SEEKER' | null
  hidingSpotId?: string | null // Add this prop
}

const ClickableSpot: React.FC<ClickableSpotProps> = ({
  id,
  userIcon,
  isSelected,
  onClick,
  children,
  userRole,
  hidingSpotId, // Destructure the new prop
}) => {
  const style: React.CSSProperties = {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: isSelected ? '0 0 8px 3px rgba(0, 163, 255, 0.7)' : 'none', // SEEKERの選択表示を強調
    borderRadius: '8px',
  }

  const isThisHidingSpot = hidingSpotId === id; // Determine if this is the hiding spot

  // HIDERが選択したか、またはそこが隠れ場所ならアイコンを表示
  const shouldShowIcon = (isSelected && userRole === 'HIDER') || isThisHidingSpot

  const userIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0%',
    left: '20%',
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: isThisHidingSpot ? 0.3 : (shouldShowIcon ? 1 : 0), // Apply glimpse opacity
    transition: 'opacity 0.2s',
    objectFit: 'contain',
  }

  return (
    <div
      style={style}
      onClick={() => onClick(id)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* クリックされたアイコンを表示 */}
      {children}
      {/* HIDERが選択したか、またはそこが隠れ場所ならアイコンをチラ見せ */}
      {shouldShowIcon && (
        <img src={userIcon} alt="User Icon" style={userIconStyle} />
      )}
    </div>
  )
}

export default ClickableSpot
