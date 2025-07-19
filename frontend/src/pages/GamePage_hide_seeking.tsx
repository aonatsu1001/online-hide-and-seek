import React, { useState, useEffect } from 'react';
import { registerGameResultCallback } from '../services/socketService';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';

// --- アセットのインポート ---
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_hide_seekingProps {
    hidingSpotId: string | null;
    userRole: 'HIDER' | 'SEEKER' | null;
}

const GamePage_hide_seeking: React.FC<GamePage_hide_seekingProps> = ({ hidingSpotId, userRole }) => {
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [gameResult, setGameResult] = useState<string | null>(null);
    const [guessedSpot, setGuessedSpot] = useState<string | null>(null);

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
            setGuessedSpot(data.guessed_spot);
            if (data.result === 'found') {
                alert('見つかってしまった！');
            } else {
                alert('見つからなかった！あなたの勝ちです！');
            }
        });
        return () => unregister();
    }, []);

    return (
        <div>
            <GameUI timeRemaining={timeRemaining} guessesLeft={0} />
            <Stage1_seeking
                selectedSpotId={guessedSpot}
                onSpotClick={() => {}}
                userIcon={myIcon}
                hidingSpotId={hidingSpotId}
                userRole={userRole}
            />
            {gameResult && (
                <div>
                    <h2>結果</h2>
                    <p>{gameResult === 'found' ? '見つかりました' : '見つかりませんでした'}</p>
                    <p>鬼が選択した場所: {guessedSpot}</p>
                </div>
            )}
        </div>
    );
};

export default GamePage_hide_seeking;
