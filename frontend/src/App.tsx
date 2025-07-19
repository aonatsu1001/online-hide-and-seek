import React, { useState, useEffect } from 'react'
import {
  initSocket,
  registerGameStartCallback,
  registerRoleUpdateCallback,
} from './services/socketService'
import './App.css'
import './styles/main.css'

// --- 各ページのコンポーネントをインポート ---
import LobbyPage from './pages/LobbyPage'
import HowToPlayPage from './pages/HowToPlayPage' // ★ 追加
import RoleSelector from './components/RoleSelector'
import GamePageHideHidding from './pages/GamePage_hide_hidding'
import GamePageSeekHidding from './pages/GamePage_seek_hidding'
import GamePageHideSeeking from './pages/GamePage_hide_seeking'
import GamePageSeekSeeking from './pages/GamePage_seek_seeking'
import Loading from './components/Loading'

// --- 型定義 ---
type PlayerRole = 'HIDER' | 'SEEKER'
type GameState =
  | 'LOBBY'
  | 'HOW_TO_PLAY'
  | 'ROLE_SELECT'
  | 'HIDING_PHASE'
  | 'LOADING'
  | 'SEEKING_PHASE'
  | 'RESULT_PHASE'
type Players = Record<string, PlayerRole>

function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY')
  const [userRole, setUserRole] = useState<PlayerRole | null>(null)
  const [hidingSpotId, setHidingSpotId] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [roomId, setRoomId] = useState<string>('')

  // --- State更新関数 ---

  const handleRoomJoined = (joinedRoomId: string, joinedUserId: string) => {
    setRoomId(joinedRoomId)
    setUsername(joinedUserId)
    initSocket(joinedRoomId)
    setGameState('ROLE_SELECT')
  }

  // ★ ページを切り替えるための関数
  const navigateToHowToPlay = () => setGameState('HOW_TO_PLAY')
  const navigateToLobby = () => setGameState('LOBBY')

  useEffect(() => {
    if (!username) return

    const gameStartCleanup = registerGameStartCallback(() => {
      console.log(
        'App.tsx: ゲーム開始の合図を受け取りました。隠れる時間へ移行します。',
      )
      setGameState('HIDING_PHASE')
    })

    const roleUpdateCleanup = registerRoleUpdateCallback((players) => {
      if (players[username]) {
        setUserRole(players[username])
      }
    })

    return () => {
      gameStartCleanup()
      roleUpdateCleanup()
    }
  }, [username])

  const handleHidingTimeEnd = (spotId: string | null) => {
    console.log('App.tsx: 隠れる時間が終了しました。')
    setHidingSpotId(spotId)
    setGameState('LOADING')
  }

  const handleHidingSpotChosen = (spotId: string) => {
    console.log(`App.tsx: 隠れ場所「${spotId}」を受け取りました。`)
    setHidingSpotId(spotId)
    setGameState('LOADING')
  }

  useEffect(() => {
    if (gameState === 'LOADING' && hidingSpotId) {
      console.log(
        'App.tsx: hidingSpotIdが設定されたため、2秒後に探す時間へ移行します。',
      )
      const timer = setTimeout(() => {
        setGameState('SEEKING_PHASE')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [gameState, hidingSpotId])

  // --- 表示するページの振り分け ---
  const renderPage = () => {
    switch (gameState) {
      case 'LOBBY':
        return (
          <LobbyPage
            onRoomJoined={handleRoomJoined}
            onNavigateToHowToPlay={navigateToHowToPlay}
          />
        )

      case 'HOW_TO_PLAY':
        return <HowToPlayPage onBack={navigateToLobby} />

      case 'ROLE_SELECT':
        return <RoleSelector username={username} roomId={roomId} />

      case 'HIDING_PHASE':
        if (userRole === 'HIDER') {
          return <GamePageHideHidding onTimeEnd={handleHidingTimeEnd} />
        } else {
          return (
            <GamePageSeekHidding onHidingSpotChosen={handleHidingSpotChosen} />
          )
        }

      case 'LOADING':
        return <Loading />

      case 'SEEKING_PHASE':
        if (userRole === 'HIDER') {
          return (
            <GamePageHideSeeking
              hidingSpotId={hidingSpotId}
              userRole={userRole}
            />
          )
        } else {
          return (
            <GamePageSeekSeeking
              hidingSpotId={hidingSpotId}
              userRole={userRole}
            />
          )
        }

      default:
        return (
          <LobbyPage
            onRoomJoined={handleRoomJoined}
            onNavigateToHowToPlay={navigateToHowToPlay}
          />
        )
    }
  }

  return <div className="app-container">{renderPage()}</div>
}

export default App
