import React from 'react';

interface ClickableSpotProps {
  id: string;
  userIcon: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  children: React.ReactNode;
  userRole?: 'HIDER' | 'SEEKER' | null; // userRoleをオプショナルで追加
}

const ClickableSpot: React.FC<ClickableSpotProps> = ({ id, userIcon, isSelected, onClick, children, userRole }) => {

    // HIDERの場合のみ、選択されたらアイコンを差し替える
    const shouldShowIcon = isSelected && userRole === 'HIDER';

    const content = (
        React.isValidElement(children) && shouldShowIcon
        ? React.cloneElement(children as React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>, { src: userIcon, alt: 'Selected Spot' })
        : children
    );

const style: React.CSSProperties = {
    cursor: 'pointer',
    display: 'inline-block', // 元の要素のサイズに合わせる
    position: 'relative',
    transition: 'transform 0.2s',
    outline: isSelected ? '3px solid #00A3FF' : 'none', // 選択されていることを視覚的に示す
    outlineOffset: '2px',
    borderRadius: '8px', // アウトラインを角丸に
};

return (
    <div
    style={style}
    onClick={() => onClick(id)}
    onMouseOver={(e) => { if (!isSelected) e.currentTarget.style.transform = 'scale(1.05)'; }}
    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
    {content}
    </div>
);
};

export default ClickableSpot;
