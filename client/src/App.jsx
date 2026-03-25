import { Routes, Route } from 'react-router-dom'

import AltasList from './features/altas/AltasList'
import AltaDetail from './features/altas/AltaDetail'
import AltaCreate from './features/altas/AltaCreate'
import AltaEdit from './features/altas/AltaEdit'

import MainLayout from './components/layout/MainLayout'

import Home from './pages/Home'
import Login from './components/login/Login'
import BuscarAltas from './pages/BuscarAltas'

import ProtectedRoute from './routes/ProtectedRoute'
import ChangePassword from './features/user/ChangePassword'

import AdminPanel from './components/dashboard/AdminPanel'
import AuditLogList from './components/dashboard/AuditLogList'
import MetricsDetail from './components/dashboard/MetricsDetails'

function App() {
  return (
   <Routes>
  <Route path="/login" element={<Login />} />

  <Route element={<MainLayout />}>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />

    <Route
      path="/altas"
      element={
        <ProtectedRoute>
          <AltasList />
        </ProtectedRoute>
      }
    />
<Route path="/buscar" element={<BuscarAltas />} />
    <Route
      path="/altas/nueva"
      element={
        <ProtectedRoute adminOnly>
          <AltaCreate />
        </ProtectedRoute>
      }
    />

    <Route
      path="/altas/:id"
      element={
        <ProtectedRoute>
          <AltaDetail />
        </ProtectedRoute>
      }
    />
      <Route path='altas/editar/:id'
  element={ <ProtectedRoute>
    <AltaEdit/>
  </ProtectedRoute>}>

    </Route>

     <Route path="/admin/panel" element={<ProtectedRoute adminOnly>
    <AdminPanel />
  </ProtectedRoute>} />
<Route path="/cambiar-contraseña"  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
    
  } />
    <Route path="/audit" element={<ProtectedRoute adminOnly>
    <AuditLogList />
  </ProtectedRoute>} />
  <Route path="/metrics/" element={<MetricsDetail />} />
  <Route path="/metrics" element={<MetricsDetail />} />
</Route>

 
</Routes>

  )
}

export default App
