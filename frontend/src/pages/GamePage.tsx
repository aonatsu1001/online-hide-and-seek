import React, { useState } from 'react';
import { sendHidingSpotId } from '../services/socketService';
import ConfirmButton from '../components/ConfirmButton';
import Stage1 from '../components/stages/Stage1'; // 作成したステージコンポーネントをインポート

// --- アセットのインポート ---
// userIconはStage1に渡すためにここでインポートします
import myIcon from '../assets/icons/user_icon.png';

const GamePage: React.FC = () => {
    // ゲームの状態管理(どの場所が選択されたか)は、親であるGamePageが担当します
    const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

    // バックエンドへの送信ロジックもGamePageが担当します
    const confirmHidingSpot = () => {
        if (selectedSpotId) {
        sendHidingSpotId(selectedSpotId);
        alert(`ID: ${selectedSpotId} に隠れました！`);
        }
    };

    return (
        <div>
        {/* ↓作成したStage1コンポーネントを呼び出し、必要な情報を渡す */}
        <Stage1 
            selectedSpotId={selectedSpotId}
            onSpotClick={setSelectedSpotId}
            userIcon={myIcon}
        />
        
        {/* ConfirmButtonはページ全体に関わるので、ここに残します */}
        <ConfirmButton 
            onClick={confirmHidingSpot} 
            disabled={!selectedSpotId} 
        />
        </div>
    );
};

export default GamePage;