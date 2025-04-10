import './App.css'
import { NavigationbarWithDropdownMultilevelMenu } from './components/NavBar'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen">
      <NavigationbarWithDropdownMultilevelMenu />
      <Home />
    </div>
  )
}

export default App
