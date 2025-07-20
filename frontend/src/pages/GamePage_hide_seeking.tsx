import React, { useState, useEffect } from 'react';
import { registerGameResultCallback } from '../services/socketService';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';
import Loading from '../components/Loading';

// --- アセットのインポート ---
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_hide_seekingProps {
    hidingSpotId: string | null;
    userRole: 'HIDER' | 'SEEKER' | null;
    onGameEnd: (resultData: any) => void;
}

const GamePage_hide_seeking: React.FC<GamePage_hide_seekingProps> = ({ hidingSpotId, userRole, onGameEnd }) => {
    const [timeRemaining, setTimeRemaining] = useState(60);

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
            onGameEnd(data);
        });
        return () => unregister();
    }, [onGameEnd]);


    return (
        <div>
            <GameUI timeRemaining={timeRemaining} guessesLeft={0} />
            <Stage1_seeking
                selectedSpotId={null}
                onSpotClick={() => {}}
                userIcon={myIcon}
                hidingSpotId={hidingSpotId}
                userRole={userRole}
            />
        </div>
    );
};

export default GamePage_hide_seeking;