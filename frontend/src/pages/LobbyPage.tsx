import React, { useState } from 'react'
import '../styles/LobbyPage.css' // ★ 作成したCSSをインポート

interface LobbyPageProps {
  onRoomJoined: (roomId: string, userId: string) => void
}

const LobbyPage: React.FC<LobbyPageProps> = ({ onRoomJoined }) => {
  const [roomId, setRoomId] = useState('')
  const [userId] = useState(`user_${Math.random().toString(36).substring(7)}`)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateRoom = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:8000/room/create_room', {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('ルームの作成に失敗しました。')
      }
      const data = await response.json()
      onRoomJoined(data.room_id, userId)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '不明なエラーが発生しました。',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinRoom = async () => {
    if (!roomId) {
      setError('ルームIDを入力してください。')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `http://localhost:8000/room/join_room/${roomId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        },
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'ルームへの参加に失敗しました。')
      }
      onRoomJoined(roomId, userId)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '不明なエラーが発生しました。',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">オンラインかくれんぼ</h1>
      <p className="lobby-subtitle">～サイト上のアイコンに上手に隠れよう～</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="lobby-actions">
        <div className="room-creation">
          <button onClick={handleCreateRoom} disabled={isLoading}>
            {isLoading ? '作成中...' : '新しいルームを作成する'}
          </button>
        </div>
        <hr />
        <div className="room-join">
          {/* ★ ボタンを先(上)に移動 */}
          <button onClick={handleJoinRoom} disabled={isLoading}>
            {isLoading ? '参加中...' : 'ルームに参加する'}
          </button>
          {/* ★ 入力欄を後(下)に移動し、クラス名を追加 */}
          <input
            type="text"
            className="lobby-input"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ルームIDを入力"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default LobbyPage
