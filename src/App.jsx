import './App.css'
import { Home } from './pages/home/index.jsx'
import { GiftContext } from './context/GiftContext'

function App() {
  return (
    <div className="App w-screen">
      <GiftContext>
        <Home />
      </GiftContext>
    </div >
  )
}

export default App
