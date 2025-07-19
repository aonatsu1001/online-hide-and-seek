import React from 'react';
import ClickableSpot from '../ClickableSpot';

// --- このコンポーネントが必要とするデータを親から受け取るための型定義 ---
interface Stage1Props {
  selectedSpotId: string | null;
  onSpotClick: (id: string) => void;
  userIcon: string;
  hiddenSpotId: string | null; // 隠れている場所のID
}

// --- このステージで使う画像 ---
import bookshelfImage from '../../assets/stage_elements/stage1/bookshelf.png';
import plantImage from '../../assets/stage_elements/stage1/plant.png';
import lampImage from '../../assets/stage_elements/stage1/lamp.png';
// ★ 1. 背景画像をインポートする
import backgroundImage from '../../assets/stage_elements/stage1/background.png';

const Stage1_seeking: React.FC<Stage1Props> = ({ selectedSpotId, onSpotClick, userIcon, hiddenSpotId }) => {
  // ★ 2. 背景画像を設定するためのスタイルオブジェクトを作成
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    minHeight: '80vh',
  };

  const isBookshelfHidden = hiddenSpotId === 'bookshelf-left';
  const isPlantHidden = hiddenSpotId === 'plant-pot';
  const isLampHidden = hiddenSpotId === 'desk-lamp';

  return (
    <div style={containerStyle}>
      <h1>ハッカソン会場</h1>
      <p>隠れている場所を探してください。</p>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px' }}>
        <ClickableSpot
          id="bookshelf-left"
          userIcon={userIcon}
          isSelected={selectedSpotId === 'bookshelf-left'}
          onClick={onSpotClick}
        >
          <img src={isBookshelfHidden ? userIcon : bookshelfImage} alt="本棚" style={{ height: '200px' }} />
        </ClickableSpot>

        <ClickableSpot
          id="plant-pot"
          userIcon={userIcon}
          isSelected={selectedSpotId === 'plant-pot'}
          onClick={onSpotClick}
        >
          <img src={isPlantHidden ? userIcon : plantImage} alt="観葉植物" style={{ height: '100px' }} />
        </ClickableSpot>
        
        <ClickableSpot
          id="desk-lamp"
          userIcon={userIcon}
          isSelected={selectedSpotId === 'desk-lamp'}
          onClick={onSpotClick}
        >
          <img src={isLampHidden ? userIcon : lampImage} alt="電気スタンド" style={{ height: '150px' }} />
        </ClickableSpot>
      </div>
    </div>
  );
};

export default Stage1_seeking;
