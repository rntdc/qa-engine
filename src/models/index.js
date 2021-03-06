const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const ENV = process.env.NODE_ENV || 'development';
let sequelize = {};

const db = {};

if (ENV === 'production') {
    sequelize = new Sequelize('mysql://USERNAME:PASSWORD@HOST:PORT/DB_NAME', { operatorsAliases: Sequelize.Op });
} else {
    sequelize = new Sequelize('mysql://root:root@localhost:3306/qa_engine', { operatorsAliases: Sequelize.Op });
}


fs
    .readdirSync(__dirname)
    .filter(file => ( file.indexOf('.') !== 0 && (file !== 'index.js')))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object
    .values(db)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(db));

sequelize.sync({ logging: console.log }); //criacao automatica das tabelas
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//sequelize precisa importar os models para dentro da instancia que foi criada
//leitura, filtro e cada arquivo é alocado no objeto db que possue function associate