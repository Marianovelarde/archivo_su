import { Routes, Route } from 'react-router-dom'
import AltasList from './features/altas/AltasList'
import AltaDetail from './features/altas/AltaDetail'
import MainLayout from './components/layout/MainLayout'
import AltaCreate from './features/altas/AltaCreate'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/altas" element={<AltasList />} />
         <Route path="/altas/nueva" element={<AltaCreate />} />
        <Route path="/altas/:id" element={<AltaDetail />} />
      </Route>
    </Routes>
  )
}

export default App
