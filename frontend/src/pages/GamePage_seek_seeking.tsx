import React, { useState, useEffect } from 'react';
import { sendGuess, registerGameResultCallback } from '../services/socketService';
import ConfirmButton from '../components/ConfirmButton';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';
import Loading from '../components/Loading';

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
    const [gameResult, setGameResult] = useState<string | null>(null);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeRemaining]);

    useEffect(() => {
        const unregister = registerGameResultCallback((data) => {
            setGameResult(data.result);
            if (data.result === 'found') {
                alert('見つけた！あなたの勝ちです！');
            } else {
                alert('そこにはいないようだ...');
            }
        });
        return () => unregister();
    }, []);

    const handleGuess = () => {
        if (!selectedSpotId) return;

        sendGuess(selectedSpotId);
        setGuessesLeft(prev => prev - 1);
    };

    if (!hidingSpotId) {
        return <Loading />;
    }

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
