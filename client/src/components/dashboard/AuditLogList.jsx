// import { DataGrid } from '@mui/x-data-grid'
// import { Box, Typography, Chip } from '@mui/material'
// import { useGetAuditLogsQuery } from '../../store/api/auditApi'

// const AuditLogList = () => {
//   const { data = [], isLoading } = useGetAuditLogsQuery()

//   if (isLoading) return <div>Cargando auditoría...</div>

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Typography variant="h6" gutterBottom>
//         Auditoría del sistema
//       </Typography>

//       <DataGrid
//         rows={data}
//         getRowId={(row) => row.id_audit_log}
//         autoHeight
//         pageSizeOptions={[10, 25, 50]}
//         columns={[
//           {
//             field: 'createdAt',
//             headerName: 'Fecha',
//             width: 180,
//             valueFormatter: (params) =>
//               new Date(params.value).toLocaleString(),
//           },
//           {
//             field: 'usuario',
//             headerName: 'Usuario',
//             width: 150,
//             valueGetter: (params) => params.row.User?.usuario,
//           },
//           {
//             field: 'action',
//             headerName: 'Acción',
//             width: 200,
//             renderCell: (params) => (
//               <Chip
//                 label={params.value}
//                 size="small"
//                 color="primary"
//               />
//             ),
//           },
//           {
//             field: 'entity',
//             headerName: 'Entidad',
//             width: 120,
//           },
//           {
//             field: 'description',
//             headerName: 'Detalle',
//             flex: 1,
//           },
//         ]}
//       />
//     </Box>
//   )
// }

// export default AuditLogList
