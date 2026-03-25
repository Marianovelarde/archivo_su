const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const router = require('../src/destino/routes/index')
const server = express();
const bodyParser = require('body-parser')
const path = require('path')
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use('/uploads', express.static(path.join(__dirname, '../uploads')))
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// 🔥 PRIMERO LAS RUTAS API
server.use('/api',router);

// 🔥 DESPUÉS LOS ESTÁTICOS
server.use(express.static(path.join(__dirname, '../../client/dist')));

// 🔥 Y AL FINAL EL CATCH-ALL
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist','index.html'))
});

module.exports = server;