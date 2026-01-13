import { Routes, Route } from 'react-router-dom'
import AltasList from './features/altas/AltasList'
import AltaDetail from './features/altas/AltaDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AltasList />} />
      <Route path="/altas/:id" element={<AltaDetail />} />
    </Routes>
  )
}

export default App
