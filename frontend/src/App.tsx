import React, { useState } from 'react';
import './App.css';
import './styles/main.css';
import GamePage_hide_hidding from './pages/GamePage_hide_hidding.tsx';
import GamePage_hide_seeking from './pages/GamePage_hide_seeking.tsx';
import GamePage_seek_hidding from './pages/GamePage_seek_hidding.tsx';
import GamePage_seek_seeking from './pages/GamePage_seek_seeking.tsx';
import RoleSelector from './components/RoleSelector.tsx';

type GameState = 'role-selection' | 'hidding' | 'seeking';
type Role = 'hider' | 'seeker' | null;

function App() {
    const [gameState, setGameState] = useState<GameState>('role-selection');
    const [role, setRole] = useState<Role>(null);
    const [hidingSpotId, setHidingSpotId] = useState<string | null>(null);

    const handleRoleSelect = (selectedRole: Role) => {
        setRole(selectedRole);
        setGameState('hidding');
    };

    const handleHidingSpotConfirmed = () => {
        setGameState('seeking');
    };

    const handleHidingSpotChosen = (spotId: string) => {
        setHidingSpotId(spotId);
        setGameState('seeking');
    };

    const renderGamePage = () => {
        if (gameState === 'role-selection') {
            // return <RoleSelector onRoleSelect={handleRoleSelect} />;
            // とりあえずhider固定で進める
            handleRoleSelect('hider');
        }

        if (role === 'hider') {
            if (gameState === 'hidding') {
                return <GamePage_hide_hidding onHidingSpotConfirmed={handleHidingSpotConfirmed} />;
            } else { // seeking
                return <GamePage_hide_seeking hidingSpotId={hidingSpotId} />;
            }
        }

        if (role === 'seeker') {
            if (gameState === 'hidding') {
                return <GamePage_seek_hidding onHidingSpotChosen={handleHidingSpotChosen} />;
            } else { // seeking
                return <GamePage_seek_seeking hidingSpotId={hidingSpotId} />;
            }
        }

        return <div>エラーが発生しました。役割を選択してください。</div>;
    };

    return (
        <div className="app-container">
            {renderGamePage()}
        </div>
    );
}

export default App;
