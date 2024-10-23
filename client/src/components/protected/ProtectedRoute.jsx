import { Outlet, Navigate } from "react-router-dom";
import userStore from "../../store/store";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const isAuthenticated = userStore((state) => state.isAuthenticate); // Corregido: "isAuthenticated"

  useEffect(() => {
    console.log("Verificando autenticación:", isAuthenticated);
  }, [isAuthenticated]); // Solo se ejecutará cuando isAuthenticated cambie

  // Si no está autenticado, redirige a "/login"
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoute