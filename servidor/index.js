

const server = require('./src/server')
const {conn} = require('./src/db')
const PORT = 3001

conn.sync({alter: false}).then(async () => {})
server.listen(PORT, () => {
    console.log('Servidor listo en puerto 3001')
})