import './App.css'
import './styles/main.css'
import GamePage from './pages/GamePage'
import RoleSelector from './components/RoleSelector.tsx' // './components/' を追加

function App() {
  return (
    <div className="app-container">
      {/* 背景画像用の要素 */}
      <GamePage />
      {/* 前面に表示する役割選択コンポーネント */}
      <RoleSelector />
    </div>
  )
}

export default App
