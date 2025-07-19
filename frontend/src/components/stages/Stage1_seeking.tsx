import React from 'react';
import Header from '../Header';
import SearchBar from '../SearchBar';
import Sidebar from '../Sidebar';
import ClickableSpot from '../ClickableSpot'; // `ClickableSpot` のパスを統一
import './../../styles/stage1.css';

// --- Propsの定義 ---
interface Stage1Props {
  selectedSpotId: string | null;
  onSpotClick: (id: string) => void;
  userIcon: string;
  // ★ seekingの機能に必要なpropsを追加
  hidingSpotId: string | null;
  userRole: 'HIDER' | 'SEEKER' | null;
}

// --- 画像アセットのインポート ---
import bookshelfImage from '../../assets/stage_elements/stage1/bookshelf.png';
import plantImage from '../../assets/stage_elements/stage1/plant.png';
import lampImage from '../../assets/stage_elements/stage1/lamp.png';
import callImage from '../../assets/stage_elements/stage1/call.png';
import webImage from '../../assets/stage_elements/stage1/web.png';
import mailImage from '../../assets/stage_elements/stage1/mail.png';
import hintImage from '../../assets/stage_elements/stage1/hint.png';
import presentImage from '../../assets/stage_elements/stage1/present.png';
import cameraImage from '../../assets/stage_elements/stage1/camera.png';
import heartImage from '../../assets/stage_elements/stage1/heart.png';
import memoImage from '../../assets/stage_elements/stage1/memo.png';
import manImage from '../../assets/stage_elements/stage1/man.png';
import docterImage from '../../assets/stage_elements/stage1/docter.png';
import washokuImage from '../../assets/stage_elements/stage1/washoku.png';
import rainImage from '../../assets/stage_elements/stage1/rain.png';
import micImage from '../../assets/stage_elements/stage1/mic.png';
import backgroundImage from '../../assets/stage_elements/stage1/background.png';

const Stage1: React.FC<Stage1Props> = ({
  selectedSpotId,
  onSpotClick,
  userIcon,
  // ★ 新しいpropsを受け取る
  hidingSpotId,
  userRole,
}) => {
  // 背景画像用のスタイル
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // ★ 選択されたアイテムをハイライトするためのスタイルを返す関数
  const getGridItemStyle = (spotId: string): React.CSSProperties => ({
    // 選択されているアイテムに黄色いボーダーと背景色を適用
    border: selectedSpotId === spotId ? '4px solid #ffde59' : '4px solid transparent',
    borderRadius: '10px',
    padding: '5px',
    backgroundColor: selectedSpotId === spotId ? 'rgba(255, 222, 89, 0.2)' : 'transparent',
    transition: 'all 0.2s ease-in-out',
  });

  // 全ての隠れ場所のデータ
  const allSpots = [
    { id: 'bookshelf-1', src: bookshelfImage, alt: '本棚1' },
    { id: 'plant-1', src: plantImage, alt: '観葉植物1' },
    { id: 'lamp-1', src: lampImage, alt: '電気スタンド1' },
    { id: 'call', src: callImage, alt: '電話' },
    { id: 'web', src: webImage, alt: 'ウェブ' },
    { id: 'mail', src: mailImage, alt: 'メール' },
    { id: 'hint', src: hintImage, alt: 'ヒント' },
    { id: 'present', src: presentImage, alt: 'プレゼント' },
    { id: 'camera', src: cameraImage, alt: 'カメラ' },
    { id: 'heart', src: heartImage, alt: 'ハート' },
    { id: 'memo', src: memoImage, alt: 'メモ' },
    { id: 'man', src: manImage, alt: '男性' },
    { id: 'docter', src: docterImage, alt: '医者' },
    { id: 'washoku', src: washokuImage, alt: '和食' },
    { id: 'rain', src: rainImage, alt: '雨' },
    { id: 'mic', src: micImage, alt: 'マイク' },
  ];

  return (
    <>
      <Header />
      <div className="stage-body">
        <SearchBar />
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content" style={backgroundStyle}>
            {/*
              hiding/seekingでテキストを出し分ける場合の参考例
              <h1>ハッカソン会場</h1>
              <p>
                {userRole === 'SEEKER'
                  ? '隠れている場所を探してください。'
                  : '隠れたい場所をクリックして選択してください。'}
              </p>
            */}
            <div className="content-grid">
              {allSpots.map((spot) => {
                const isHiddenHere = hidingSpotId === spot.id;
                return (
                  <div className="grid-item" key={spot.id} style={getGridItemStyle(spot.id)}>
                    <ClickableSpot
                      id={spot.id}
                      userIcon={userIcon}
                      isSelected={selectedSpotId === spot.id}
                      onClick={onSpotClick}
                      userRole={userRole}
                      isHidingSpot={isHiddenHere}
                    >
                      <img src={spot.src} alt={spot.alt} />
                    </ClickableSpot>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Stage1;
