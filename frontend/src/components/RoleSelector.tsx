import React, { useState } from 'react'
import '../styles/RoleSelector.css' // スタイルを別ファイルで定義

// プレイヤーの役割を定義する型
// HIDER: 隠れる側, SEEKER: 鬼, null: 未選択
type PlayerRole = 'HIDER' | 'SEEKER'

interface RoleSelectorProps {
  username: string // 仮のユーザー名
  roomId: string // 仮のルームID
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ username, roomId }) => {
  // 現在選択されている役割を保持するstate
  // 初期値は未選択状態のnull
  const [selectedRole, setSelectedRole] = useState<PlayerRole | null>(null)

  // 役割を選択したときの処理
  const handleRoleSelect = async (role: PlayerRole) => {
    setSelectedRole(role)
    console.log(`役割「${role}」を選択しました。サーバーに通知します。`)
    try {
      const response = await fetch('https://online-hide-and-seek-back.onrender.com/select-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, role, room_id: roomId }),
      })
      if (!response.ok) {
        throw new Error('役割選択の通知に失敗しました。')
      }
      const result = await response.json()
      console.log('サーバーからの応答:', result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="role-selection-container">
      <div
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          border: '1px solid #ddd',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          ルームID: <span style={{ color: '#007bff' }}>{roomId}</span>
        </p>
      </div>
      <h2>役割を選択してください</h2>
      <div className="button-group">
        <button
          // selectedRoleが'HIDER'の場合に 'selected' クラスを適用
          className={`role-button ${selectedRole === 'HIDER' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('HIDER')}
        >
          隠れる人
        </button>
        <button
          // selectedRoleが'SEEKER'の場合に 'selected' クラスを適用
          className={`role-button ${selectedRole === 'SEEKER' ? 'selected' : ''}`}
          onClick={() => handleRoleSelect('SEEKER')}
        >
          探す人
        </button>
      </div>
      <div className="selection-status">
        {selectedRole ? (
          <p>
            あなたの役割:{' '}
            <strong>{selectedRole === 'HIDER' ? '隠れる人' : '探す人'}</strong>
          </p>
        ) : (
          <p>役割が選択されていません。</p>
        )}
      </div>
    </div>
  )
}

export default RoleSelector
