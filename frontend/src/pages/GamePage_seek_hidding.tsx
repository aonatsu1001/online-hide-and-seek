import React, { useState, useEffect } from 'react';
import { registerHidingSpotChosenCallback } from '../services/socketService';
import Stage1_seeking from '../components/stages/Stage1_seeking';
import GameUI from '../components/GameUI';
import myIcon from '../assets/icons/user_icon.png';

interface GamePage_seek_hiddingProps {
    onHidingSpotChosen: (spotId: string) => void;
}

const GamePage_seek_hidding: React.FC<GamePage_seek_hiddingProps> = ({ onHidingSpotChosen }) => {
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        const cleanup = registerHidingSpotChosenCallback((spotId) => {
            console.log('Hiding spot chosen:', spotId);
            onHidingSpotChosen(spotId);
        });

        return () => {
            clearInterval(timerId);
            cleanup();
        };
    }, [onHidingSpotChosen]);

    return (
        <div>
            <Stage1_seeking 
                selectedSpotId={null}
                onSpotClick={() => {}}
                userIcon={myIcon}
                hiddenSpotId={null}
            />
        </div>
    );
};

export default GamePage_seek_hidding;
