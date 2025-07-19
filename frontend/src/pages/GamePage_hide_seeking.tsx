import React, { useState, useEffect } from 'react';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';

// --- アセットのインポート ---
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_hide_seekingProps {
    hidingSpotId: string | null;
}

const GamePage_hide_seeking: React.FC<GamePage_hide_seekingProps> = ({ hidingSpotId }) => {
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeRemaining]);

    return (
        <div>
            <GameUI timeRemaining={timeRemaining} guessesLeft={0} />
            <Stage1_seeking
                selectedSpotId={null}
                onSpotClick={() => {}}
                userIcon={myIcon}
                hiddenSpotId={hidingSpotId}
            />
        </div>
    );
};

export default GamePage_hide_seeking;
