import './styles/main.css'
import GamePage from './pages/GamePage'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        {/* ★ 検索バーをここに配置 */}
        <SearchBar />

        {/* ★ サイドバーとメインコンテンツを新しいdivで囲む */}
        <div className="content-wrapper">
          <Sidebar />
          <main className="main-content">
            <GamePage />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
