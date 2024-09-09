require('dotenv').config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

const {DB_USER, DB_PASSWORD, DB_HOST} = process.env

const entityAltas = require('./models/EntityAltas')
const entityDestino = require('./models/EntityDestino')
const entityPlano = require('./models/EntityPlano')
const entityPropietarios = require('./models/EntityPropietarios')


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
    EntityPropietarios
} = sequelize.models


//relacion entre propietarios - altas
//has many: relación de uno a muchos
// belongsTo: relacion de uno a uno
//belongsToMany: relacion de muchos a muchos
EntityPropietarios.hasMany(EntityAltas, {
    foreignKey: 'id_propietario'
})
EntityAltas.belongsTo(EntityPropietarios, {
    foreignKey: 'id_propietario'
})
EntityAltas.belongsTo(EntityDestino, {
    foreignKey: 'id_destino'
})
EntityDestino.hasMany(EntityAltas, {
    foreignKey: 'id_destino'
})
EntityAltas.belongsTo(EntityPlano, {
    foreignKey: 'id_tipo_plano'
})
EntityPlano.hasMany(EntityAltas, {
    foreignKey: 'id_tipo_plano'
})

module.exports = {
    ...sequelize.models,
    conn: sequelize
}