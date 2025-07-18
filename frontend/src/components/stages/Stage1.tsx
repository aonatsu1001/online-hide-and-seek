import React from 'react';
import ClickableSpot from '../ClickableSpot';

// --- このコンポーネントが必要とするデータを親から受け取るための型定義 ---
interface Stage1Props {
  selectedSpotId: string | null;
  onSpotClick: (id: string) => void;
  userIcon: string;
}

// --- このステージで使う画像 ---
import bookshelfImage from '../../assets/stage_elements/stage1/bookshelf.png';
import plantImage from '../../assets/stage_elements/stage1/plant.png';
import lampImage from '../../assets/stage_elements/stage1/lamp.png';
// ★ 1. 背景画像をインポートする
import backgroundImage from '../../assets/stage_elements/stage1/background.png';

const Stage1: React.FC<Stage1Props> = ({ selectedSpotId, onSpotClick, userIcon }) => {
  // ★ 2. 背景画像を設定するためのスタイルオブジェクトを作成
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`, // 背景画像を指定
    backgroundSize: 'cover',                   // コンテナ全体を覆うように調整
    backgroundPosition: 'center',              // 画像を中央に配置
    backgroundRepeat: 'no-repeat',             // 画像の繰り返しを無効化
    padding: '20px',                           // 内側の余白
    minHeight: '80vh',                         // 最低限の高さを確保
  };

  return (
    // ★ 3. 作成したスタイルを外側のdivに適用する
    <div style={containerStyle}>
      <h1>ハッカソン会場</h1>
      <p>隠れたい場所をクリックして選択してください。</p>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px' }}>
        {/* ClickableSpotコンポーネントは変更なし */}
        <ClickableSpot
          id="bookshelf-left"
          userIcon={userIcon}
          isSelected={selectedSpotId === 'bookshelf-left'}
          onClick={onSpotClick}
        >
          <img src={bookshelfImage} alt="本棚" style={{ height: '200px' }} />
        </ClickableSpot>

        <ClickableSpot
          id="plant-pot"
          userIcon={userIcon}
          isSelected={selectedSpotId === 'plant-pot'}
          onClick={onSpotClick}
        >
          <img src={plantImage} alt="観葉植物" style={{ height: '100px' }} />
        </ClickableSpot>
        
        <ClickableSpot
          id="desk-lamp"
          userIcon={userIcon}
          isSelected={selectedSpotId === 'desk-lamp'}
          onClick={onSpotClick}
        >
          <img src={lampImage} alt="電気スタンド" style={{ height: '150px' }} />
        </ClickableSpot>
      </div>
    </div>
  );
};

export default Stage1;