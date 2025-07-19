import React from 'react';

interface ClickableSpotProps {
  id: string; // サイト制作者が割り当てるユニークID
  userIcon: string; // 差し替え用のユーザーアイコン画像
  isSelected: boolean; // この場所が選択されているか（親コンポーネントが管理）
  onClick: (id: string) => void; // クリックされたことを親に通知する関数
  children: React.ReactNode; // サイト制作者が配置する元の画像や要素
}

const ClickableSpot: React.FC<ClickableSpotProps> = ({ id, userIcon, isSelected, onClick, children }) => {

    // isSelectedがtrueの場合、children（元のimg要素）をクローンし、
    // srcプロパティだけをuserIconに差し替える
    const content = (
        // isSelectedがtrueでもfalseでも、childrenがReact要素であることを確認
        React.isValidElement(children) && isSelected
        ? React.cloneElement(children as React.ReactElement, { src: userIcon, alt: 'Selected Spot' })
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