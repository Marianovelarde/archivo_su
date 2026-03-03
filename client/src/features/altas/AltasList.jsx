import { useGetAltasQuery } from '../../store/api/AltasApi'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'
const AltasList = () => {
  const { data, isLoading, isError } = useGetAltasQuery()
  const navigate = useNavigate()
  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar datos</div>

  const rows = data?.new_alta ?? []


  return (
    <Box sx={{ height: 600, width: '100%' }}>
      
      <Typography variant="h4" gutterBottom>
        Altas registradas
      </Typography>
  <Box sx={{ mt: 2 }}>
          <Button
            size="medium"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </Box>
      <DataGrid
         rows={rows}
  getRowId={(row) => row.id_Altas}
  pageSizeOptions={[10, 20, 50]}
  onRowClick={(params) => navigate(`/altas/${params.row.id_Altas}`)}
  initialState={{
    pagination: { paginationModel: { pageSize: 10, page: 0 } },
  }}
  sx={{
    border: 'none',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#e3edf7',
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#f1f7fd',
    },
    fontSize: '20px',
  }}
    columns={[
  { field: 'num_de_ficha', headerName: 'Ficha', width: 90 },
  
{
  field: 'propietario',
  headerName: 'Propietario',
  width: 220,
  fontWeight: 'bold',
  valueGetter: (params, row) =>
    `${row.propietario?.apellido ?? ''} ${row.propietario?.nombre ?? ''}`,
},
  {
    field: 'direccion',
    headerName: 'Dirección',
    flex: 1,
    valueGetter: (_, row) =>
      `${row.calle ?? ''} - ${row.barrio ?? ''}`,
  },


  {
    field: 'distrito',
    headerName: 'Dist.',
    width: 80,
  },
  {
    field: 'zona',
    headerName: 'Zona',
    width: 80,
  },
  {
    field: 'manzana',
    headerName: 'Mz.',
    width: 80,
  },
  {
    field: 'parcela',
    headerName: 'Parc.',
    width: 80,
  },

  {
    field: 'destino',
    headerName: 'Destino',
    width: 160,
    valueGetter: (_, row) =>
      row.entityDestino?.tipo_de_destino ?? '',
  },
          {
            field: 'plano',
            headerName: 'Tipo de plano',
            width: 240,
            valueGetter: (_, row) =>
              row.entityPlano?.tipo_plano ?? '',
          },

         
        ]}
        autoHeight
        disableRowSelectionOnClick
      />
      
    </Box>
  )
}

export default AltasList
