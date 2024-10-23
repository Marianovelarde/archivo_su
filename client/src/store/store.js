import {create} from 'zustand'
import axios from 'axios'

const Store = create((set) => ({

    user: null,
    isAuthenticate: true,
    error: null,
    
    createUser: async (usuario, contraseña) => {
        try {
            const response = await axios.post('http://localhost:3001/user/signup', {
                usuario,
                contraseña
            })
            
            
            set({user: response.data, isAuthenticate: true, error: null})
            console.log('Usuario creado con exito', response.data)
        } catch (error) {
            console.error('Error al crear usuario', error)
            set({error: error.response?.data || 'error al crear el usuario'})
        }
    },
    login: async (usuario, contraseña) => {
        try {
                const response = await axios.post('http://localhost:3001/user/login', {
                    usuario,
                    contraseña
                })
        
            

                set({user: response.data, isAuthenticate: true})
                localStorage.setItem('token', response.data.token)
                console.log('Login exitoso');
                       
        } catch (error) {
            console.error('Error al loguearse', error.response?.data || error.message)
            alert('Credenciales incorrectas')
        }
    },
    logout: () => {
        set({ user: null, isAuthenticate: false });
        localStorage.removeItem('token'); // Eliminar token al cerrar sesión
      },
    AltaRegistro: [],
    propietarios: [],
    tiposPlanos: [],
    tiposDeDestino: [],
    errorAltas: null,

    crearPlanos: async (plano) => {
        try {
            const response = await axios.post('http://localhost:3001/altas', plano)
                set((state) => ({
                    AltaRegistro: [...state.AltaRegistro, response.data],
                    errorAltas: null
                }))
            
            console.log('Alta creada con éxito');
       
        } catch (error) {
            set({errorAltas: error.response?.data || 'Error al crear alta'})
        }
    },
    crearPropietario: async () => {
        try {
            const response = await axios.post('http://localhost:3001/propietarios')
            set((state) => ({propietarios: [...state.propietarios, response.data]}))
            console.log('Propietario creado con éxito');
            
        } catch (error) {
            console.error('Error al dar de alta un propietario', error)
            set({errorAltas: error.response?.data || 'Error al dar de alta al propietario'})
        }
    },
    crearDestino: async () => {
        try {
            const response = await axios.post('http://localhost:3001/destino')
            set((state) => ({tiposDeDestino: [...state.tiposDeDestino, response.data]}))
            console.log('Destino creado con éxito');
            
        } catch (error) {
             console.error('Error al crear tipo de destino', error)
             set({errorAltas: error.response?.data || 'Error al crear tipo de destino'})
        }
    },
    crearTipoPlano: async () => {
        try {
            const response = await axios.post('http://localhost:3001/planos')
            set((state) => ({tiposPlanos: [...state.tiposPlanos, response.data]}))
            console.log('El tipo de plano se ha creado con éxito');
            
        } catch (error) {
            console.error('Error al crear tipo de plano ',error)
            set({errorAltas: error.response?.data || 'error al crear tipo de plano'})
        }
    },
    obtenerRegistros: async () => {
        try {
          const [planosRes, propietariosRes, tiposPlanoRes, tiposDestinoRes] = await Promise.all([
            axios.get('http://localhost:3001/planos'),
            axios.get('http://localhost:3001/propietarios'),
            axios.get('http://localhost:3001/tipos-plano'),
            axios.get('http://localhost:3001/tipos-destino'),
          ]);
    
          set({
            planos: planosRes.data,
            propietarios: propietariosRes.data,
            tiposPlano: tiposPlanoRes.data,
            tiposDestino: tiposDestinoRes.data,
          });
    
          console.log('Registros obtenidos con éxito');
        } catch (error) {
          console.error('Error al obtener registros', error);
          set({ errorAltas: error.response?.data || 'Error al obtener registros' });
        }
      },
    
    }))
export default Store