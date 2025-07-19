import React, { useState } from 'react';
import '../styles/RoleSelector.css';

// 【変更】App.tsxと型を合わせるため、小文字に統一します。
type PlayerRole = 'hider' | 'seeker';

// --- このコンポーネントが受け取るPropsの型を定義 ---
interface RoleSelectorProps {
  // 【変更】親(App.tsx)に選択した役割を伝えるため、引数(role)を受け取れるようにします。
  onRoleSelected: (role: PlayerRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelected }) => {
  const [selectedRole, setSelectedRole] = useState<PlayerRole | null>(null);

  const handleRoleSelect = (role: PlayerRole) => {
    setSelectedRole(role);
    console.log(`役割「${role === 'hider' ? '隠れる側' : '鬼'}」を選択しました。`);

    // 少し待ってから画面を遷移させる
    setTimeout(() => {
      // 【変更】親から渡された関数に、選択した役割(role)を渡して呼び出す！
      onRoleSelected(role);
    }, 1000); // 1秒後にゲーム画面へ
  };
  
  return (
    <div className="role-selection-container">
      <h2>役割を選択してください</h2>
      <div className="button-group">
        <button
          // 【変更】比較する文字列を小文字に統一
          className={`role-button ${selectedRole === 'hider' ? 'selected' : ''}`}
          // 【変更】渡す役割を小文字に統一
          onClick={() => handleRoleSelect('hider')}
        >
          隠れる側
        </button>
        <button
          // 【変更】比較する文字列を小文字に統一
          className={`role-button ${selectedRole === 'seeker' ? 'selected' : ''}`}
          // 【変更】渡す役割を小文字に統一
          onClick={() => handleRoleSelect('seeker')}
        >
          鬼
        </button>
      </div>
      <div className="selection-status">
        {selectedRole ? (
          <p>
            {/* 【変更】比較する文字列を小文字に統一 */}
            あなたの役割: <strong>{selectedRole === 'hider' ? '隠れる側' : '鬼'}</strong>
            <br />
            <small>まもなくゲームを開始します...</small>
          </p>
        ) : (
          <p>役割が選択されていません。</p>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;