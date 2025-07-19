import React, { useState, useEffect } from 'react';
import { sendHidingSpotId } from '../services/socketService';
import ConfirmButton from '../components/ConfirmButton';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';

// --- アセットのインポート ---
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_seek_seekingProps {
    hidingSpotId: string | null;
}

const GamePage_seek_seeking: React.FC<GamePage_seek_seekingProps> = ({ hidingSpotId }) => {
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

    const confirmHidingSpot = () => {
        if (selectedSpotId) {
            sendHidingSpotId(selectedSpotId);
            alert(`ID: ${selectedSpotId} を探します！`);
            setGuessesLeft(prevGuesses => prevGuesses - 1);
        }
    };

    return (
        <div>
            <GameUI timeRemaining={timeRemaining} guessesLeft={guessesLeft} />
            <Stage1_seeking
                selectedSpotId={selectedSpotId}
                onSpotClick={setSelectedSpotId}
                userIcon={myIcon}
                hiddenSpotId={hidingSpotId}
            />
            <ConfirmButton 
                onClick={confirmHidingSpot} 
                disabled={!selectedSpotId} 
            />
        </div>
    );
};

export default GamePage_seek_seeking;
