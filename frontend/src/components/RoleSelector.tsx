import React, { useState } from 'react';
import '../styles/RoleSelector.css';

// 【変更】API仕様書に合わせて、型を大文字に統一します。
type PlayerRole = 'HIDER' | 'SEEKER';

interface RoleSelectorProps {
  // 【変更なし】親に選択した役割を伝えるためのProps
  onRoleSelected: (role: PlayerRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelected }) => {
  const [selectedRole, setSelectedRole] = useState<PlayerRole | null>(null);
  // 【追加】API送信中のローディング状態とエラーメッセージを管理
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = async (role: PlayerRole) => {
    // 送信中はボタンを無効化
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setSelectedRole(role);
    
    // TODO: 本番環境では、ログイン情報などから動的にユーザー名を取得してください。
    const username = `player_${Math.floor(Math.random() * 10000)}`;
    console.log(`ユーザー「${username}」が役割「${role}」を選択しました。APIに送信します...`);

    try {
      // 【追加】バックエンドAPIに役割選択情報をPOSTで送信
      const response = await fetch('http://localhost:8000/game/select-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          role: role,
        }),
      });

      if (!response.ok) {
        // サーバーからのエラーレスポンスを処理
        const errorData = await response.json();
        throw new Error(errorData.detail || '役割の選択に失敗しました。');
      }

      const result = await response.json();
      console.log('APIからの成功レスポンス:', result.message);

      // API通信が成功したら、少し待ってから親コンポーネントに通知して画面遷移
      setTimeout(() => {
        onRoleSelected(role);
      }, 1000);

    } catch (err: any) {
      console.error("APIエラー:", err);
      setError(err.message);
      setIsLoading(false); // エラーが発生したらローディングを解除
      setSelectedRole(null); // 選択状態をリセット
    }
  };
  
  return (
    <div className="role-selection-container">
      <h2>役割を選択してください</h2>
      <div className="button-group">
        <button
          className={`role-button ${selectedRole === 'HIDER' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('HIDER')}
          disabled={isLoading} // 送信中は無効化
        >
          {isLoading && selectedRole === 'HIDER' ? '送信中...' : '隠れる側'}
        </button>
        <button
          className={`role-button ${selectedRole === 'SEEKER' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('SEEKER')}
          disabled={isLoading} // 送信中は無効化
        >
          {isLoading && selectedRole === 'SEEKER' ? '送信中...' : '鬼'}
        </button>
      </div>
      <div className="selection-status">
        {error && <p className="error-message">エラー: {error}</p>}
        {selectedRole && !error ? (
          <p>
            あなたの役割: <strong>{selectedRole === 'HIDER' ? '隠れる側' : '鬼'}</strong>
            <br />
            <small>まもなくゲームを開始します...</small>
          </p>
        ) : (
          !error && <p>役割が選択されていません。</p>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;