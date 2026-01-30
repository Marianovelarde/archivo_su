require('dotenv').config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

const {DB_USER, DB_PASSWORD, DB_HOST} = process.env

const entityAltas = require('./models/EntityAltas')
const entityDestino = require('./models/EntityDestino')
const entityPlano = require('./models/EntityPlano')
const entityPropietarios = require('./models/EntityPropietarios')
const entityDocument = require('./models/EntityDocument')
const entityLoan = require('./models/EntityLoan')
const entityUser = require('./models/EntityUser')
const entityAuditLogs = require('./models/EntityAuditLogs')
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/archivo_su`, {
    logging: false,
    native: false
});

const basename = path.basename(__filename)

const modelDefiners = [];

entityAltas(sequelize)
entityDestino(sequelize)
entityPlano(sequelize)
entityPropietarios(sequelize)
entityDocument(sequelize) 
entityLoan(sequelize)
entityUser(sequelize)
entityAuditLogs(sequelize)
fs.readdirSync(path.join(__dirname, '/models'))
.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file) => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {
    EntityAltas,
    EntityDestino,
    EntityPlano,
    EntityPropietarios,
    EntityDocument,
    EntityLoan,
    EntityUser,
    EntityAuditLogs
} = sequelize.models


//relacion entre propietarios - altas
//has many: relación de uno a muchos
// belongsTo: relacion de uno a uno
//belongsToMany: relacion de muchos a muchos

//Altas - propietario 
EntityPropietarios.hasMany(EntityAltas, {
    foreignKey: 'id_propietario'
})
EntityAltas.belongsTo(EntityPropietarios, {
    foreignKey: 'id_propietario'
})
//altas - destino
EntityAltas.belongsTo(EntityDestino, {
    foreignKey: 'id_destino'
})
EntityDestino.hasMany(EntityAltas, {
    foreignKey: 'id_destino'
})

//altas - tipo de plano
EntityAltas.belongsTo(EntityPlano, {
    foreignKey: 'id_tipo_plano'
})
EntityPlano.hasMany(EntityAltas, {
    foreignKey: 'id_tipo_plano'
})

// usuario - documentacion
EntityUser.hasMany(EntityDocument, {
  foreignKey: 'uploaded_by',
})
EntityDocument.belongsTo(EntityUser, {
  foreignKey: 'uploaded_by',
})

// documentacion - prestamo
EntityDocument.hasMany(EntityLoan, {
  foreignKey: 'id_document',
})

EntityLoan.belongsTo(EntityDocument, {
  foreignKey: 'id_document',
})

//usuario - prestamo

EntityUser.hasMany(EntityLoan, {
  foreignKey: 'created_by',
})

EntityLoan.belongsTo(EntityUser, {
  foreignKey: 'created_by',
})

module.exports = {
    ...sequelize.models,
    conn: sequelize
}