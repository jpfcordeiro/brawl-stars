
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavigationbarWithDropdownMultilevelMenu } from './components/NavBar';
import Home from './pages/Home';
import { Brawlers } from './pages/Brawlers';
import GameModes from './pages/GameModes';
import Events from './pages/Events';
import Maps from './pages/Maps';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient">
        <NavigationbarWithDropdownMultilevelMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brawlers" element={<Brawlers />} />
          <Route path="/modos" element={<GameModes />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/mapas" element={<Maps />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
