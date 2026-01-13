import * as React from 'react';
;
import Box from '@mui/material/Box';


import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import logoMuni from '../../assets/munilogo.png'

const Inicio = () => {

  



  return (
    <React.Fragment>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#18278C',
          color: 'white',
          width: '1370px',
          height: '90px',
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          // p: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '5px'
        }}
      >
      <Card sx={{height: '50px', width: '50px', marginLeft: '10px'}}>
        <CardMedia component='img'
        src={logoMuni}
        alt='logo muni'/>
      </Card>
        <Typography variant="h7" sx={{marginRight: '930px', fontFamily: 'inter', letterSpacing: '1px', fontSize: '20px' }}>
          Sistema de Registro de planos aprobados
         
        <Typography variant='p' sx={{fontSize: '10px',  display: 'flex', }}>Dirección de Suelo Urbano - Municipalidad de la Capital</Typography>
        </Typography>

      
       
      </Box>

     
    </React.Fragment>
  );
};

export default Inicio;
