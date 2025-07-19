import React, { useState, useEffect } from 'react';
import ConfirmButton from '../components/ConfirmButton';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';

// --- アセットのインポート ---
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_seek_seekingProps {
    hidingSpotId: string | null;
    userRole: 'HIDER' | 'SEEKER' | null;
}

const GamePage_seek_seeking: React.FC<GamePage_seek_seekingProps> = ({ hidingSpotId, userRole }) => {
    const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [guessesLeft, setGuessesLeft] = useState(3);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeRemaining]);

    const handleGuess = () => {
        if (!selectedSpotId) return;

        if (selectedSpotId === hidingSpotId) {
            alert('見つけた！あなたの勝ちです！');
            // ここでゲーム終了の処理を呼び出す
        } else {
            alert('そこにはいないようだ...');
            setGuessesLeft(prev => prev - 1);
        }
    };

    return (
        <div>
            <GameUI timeRemaining={timeRemaining} guessesLeft={guessesLeft} />
            <Stage1_seeking
                selectedSpotId={selectedSpotId}
                onSpotClick={setSelectedSpotId}
                userIcon={myIcon}
                hidingSpotId={hidingSpotId}
                userRole={userRole}
            />
            <ConfirmButton 
                onClick={handleGuess} 
                disabled={!selectedSpotId || guessesLeft === 0}
                text="ここだ！"
            />
        </div>
    );
};

export default GamePage_seek_seeking;
