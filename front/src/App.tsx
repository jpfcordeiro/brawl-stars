import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { NavigationbarWithDropdownMultilevelMenu } from './components/NavBar'
import Home from './pages/Home'
import { Brawlers } from './pages/Brawlers'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient">
        <NavigationbarWithDropdownMultilevelMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brawlers" element={<Brawlers />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
