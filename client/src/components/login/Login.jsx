import Inicio from "../layout/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Store from "../../store/store"; // Importamos el hook Zustand
import { Typography } from "@mui/material";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const navigate = useNavigate();
  const { isAuthenticate, login, error } = Store(); // Usamos Zustand para acceder al estado y acciones

  // Si ya está autenticado, redirige al home
  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usuario, contraseña);
  };

  return (
    <div>
      <Typography variant="h1" sx={{fontSize: '30px', fontFamily: 'inter', fontWeight: 'bold', marginBottom: '100px'}}>Bienvenidos al sistema de registro de planos aprobados</Typography>
      <div style={{ maxWidth: "400px",  margin: "auto", marginLeft: '450px', padding: "1rem", textAlign: 'center', 
      backgroundColor: '#18278C', borderRadius: '10px', opacity: '90%' }}>
        <Inicio/>
        <h2 style={{color: 'black'}}>Ingresar al sistema</h2>
        <form onSubmit={handleSubmit}>
          <label style={{color: 'black'}}>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: "100%", height: '30px', marginBottom: "10px", alignItems: 'center' }}
          />

          <label style={{color: 'black'}}>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            style={{ width: "100%", height: '30px', marginBottom: "10px" }}
          />
          <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit" style={{ width: "40%", marginLeft: '135px' }}>Ingresar</Button>
          </Stack>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      </div>
  );
};

export default Login;
