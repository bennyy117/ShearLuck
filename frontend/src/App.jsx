import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import MapScreen from './components/MapScreen'
import DisplayResult from './components/DisplayResult'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/display-result" element={<DisplayResult />} />
          <Route path="/map" element={<MapScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
