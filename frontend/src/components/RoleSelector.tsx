import React, { useState } from 'react';
import './RoleSelection.css'; // スタイルを別ファイルで定義

// プレイヤーの役割を定義する型
// HIDER: 隠れる側, SEEKER: 鬼, null: 未選択
type PlayerRole = 'HIDER' | 'SEEKER' | null;

const RoleSelection: React.FC = () => {
  // 現在選択されている役割を保持するstate
  // 初期値は未選択状態のnull
    const [selectedRole, setSelectedRole] = useState<PlayerRole>(null);

  // 役割を選択したときの処理
    const handleRoleSelect = (role: PlayerRole) => {
    setSelectedRole(role);
    // ここでバックエンドに選択した役割を送信する処理などを追加します
    console.log(`役割「${role === 'HIDER' ? '隠れる側' : '鬼'}」を選択しました。`);
    };
    
    return (
    <div className="role-selection-container">
    <h2>役割を選択してください</h2>
    <div className="button-group">
        <button
          // selectedRoleが'HIDER'の場合に 'selected' クラスを適用
        className={`role-button ${selectedRole === 'HIDER' ? 'selected' : ''}`}
        onClick={() => handleRoleSelect('HIDER')}
        >
        隠れる側
        </button>
        <button
          // selectedRoleが'SEEKER'の場合に 'selected' クラスを適用
        className={`role-button ${selectedRole === 'SEEKER' ? 'selected' : ''}`}
        onClick={() => handleRoleSelect('SEEKER')}
        >
        鬼
        </button>
    </div>
    <div className="selection-status">
        {selectedRole ? (
        <p>
            あなたの役割: <strong>{selectedRole === 'HIDER' ? '隠れる側' : '鬼'}</strong>
        </p>
        ) : (
        <p>役割が選択されていません。</p>
        )}
    </div>
    </div>
);
};

export default RoleSelection;