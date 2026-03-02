const server = require('./src/server')
const { conn } = require('./src/db')

const PORT = 3001

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor listo en puerto ${PORT}`)
  })
})