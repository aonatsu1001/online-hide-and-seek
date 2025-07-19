import './App.css'
import './styles/main.css'
import GamePage from './pages/GamePage'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
// import RoleSelector from './components/RoleSelector.tsx' // './components/' を追加

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar /> {/* ★ サイドバーを配置 */}
        <main className="main-content">
          <SearchBar /> {/* ★ 検索バーを配置 */}
          <GamePage />
        </main>
      </div>
    </div>
  )
}

export default App
