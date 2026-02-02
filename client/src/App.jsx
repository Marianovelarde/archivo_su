import { Routes, Route } from 'react-router-dom'

import AltasList from './features/altas/AltasList'
import AltaDetail from './features/altas/AltaDetail'
import AltaCreate from './features/altas/AltaCreate'

import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Login from './components/login/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import ChangePassword from './features/user/ChangePassword'
import AdminPanel from './components/dashboard/AdminPanel'
// import AuditLogList from './components/dashboard/AuditLogList'
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
  </Route>
  <Route path="/admin/panel" element={<ProtectedRoute adminOnly>
    <AdminPanel />
  </ProtectedRoute>} />
<Route path="/cambiar-contraseña"  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
    
  } />
    {/* <Route path="/audit" element={<ProtectedRoute adminOnly>
    <AuditLogList />
  </ProtectedRoute>} /> */}
</Routes>

  )
}

export default App
