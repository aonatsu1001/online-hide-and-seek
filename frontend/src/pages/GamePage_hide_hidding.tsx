import React, { useState, useEffect } from 'react';
import { sendHidingSpotId } from '../services/socketService';
import ConfirmButton from '../components/ConfirmButton';
import Stage1_hidding from '../components/stages/Stage1_hidding';
import GameUI from '../components/GameUI';

// --- アセットのインポート ---
// userIconはStage1に渡すためにここでインポートします
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_hide_hiddingProps {
    onHidingSpotConfirmed: () => void;
}

const GamePage_hide_hidding: React.FC<GamePage_hide_hiddingProps> = ({ onHidingSpotConfirmed }) => {
    // ゲームの状態管理(どの場所が選択されたか)は、親であるGamePageが担当します
    const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(60); // 制限時間を60秒に設定

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeRemaining]);

    // バックエンドへの送信ロジックもGamePageが担当します
    const confirmHidingSpot = () => {
        if (selectedSpotId) {
            sendHidingSpotId(selectedSpotId);
            onHidingSpotConfirmed();
        }
    };

    return (
        <div>
        <GameUI timeRemaining={timeRemaining} guessesLeft={0} />
        {/* ↓作成したStage1コンポーネントを呼び出し、必要な情報を渡す */}
        <Stage1_hidding 
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

export default GamePage_hide_hidding;
