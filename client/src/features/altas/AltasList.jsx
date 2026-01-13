import { useGetAltasQuery } from '../../store/api/AltasApi'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

const AltasList = () => {
  const { data, isLoading, isError } = useGetAltasQuery()

  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar datos</div>

  const rows = data?.new_alta ?? []

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Altas registradas
      </Typography>

      <DataGrid
         rows={rows}
  getRowId={(row) => row.id_Altas}
  pageSizeOptions={[10, 20, 50]}
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
  }}
        columns={[
          { field: 'num_de_ficha', headerName: 'Ficha', width: 100 },
          { field: 'ubicacion', headerName: 'Ubicación', flex: 1 },

          {
            field: 'propietario',
            headerName: 'Propietario',
            width: 220,
            valueGetter: (_, row) =>
              `${row.entityPropietario?.nombre ?? ''} ${row.entityPropietario?.apellido ?? ''}`,
          },

          {
            field: 'destino',
            headerName: 'Destino',
            width: 180,
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

          { field: 'distrito', headerName: 'Distrito', width: 100 },
          { field: 'zona', headerName: 'Zona', width: 80 },
          { field: 'manzana', headerName: 'Manzana', width: 100 },
          { field: 'parcela', headerName: 'Parcela', width: 100 },
        ]}
        autoHeight
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default AltasList
