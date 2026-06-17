import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

import { useGetAuditoriaPlanosQuery } from '../../store/api/auditPlanosApi'

const AuditPlanosAdmin = () => {

  const { data, isLoading } = useGetAuditoriaPlanosQuery()

  if (isLoading) return <Typography>Cargando...</Typography>

  return (

    <TableContainer component={Paper}>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Fecha</TableCell>

            <TableCell>Usuario</TableCell>

            <TableCell>Ficha</TableCell>

            <TableCell>Plano</TableCell>

            <TableCell>IP</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {data?.map((item) => (

            <TableRow key={item.id}>

              <TableCell>
                {new Date(item.fecha_acceso).toLocaleString()}
              </TableCell>

              <TableCell>
                {item.entityUser?.usuario}
              </TableCell>

              <TableCell>
                {item.entityAlta?.num_de_ficha}
              </TableCell>

              <TableCell>
                {item.entityPlanoArchivo?.nombre}
              </TableCell>

              <TableCell>
                {item.ip}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  )
}

export default AuditPlanosAdmin