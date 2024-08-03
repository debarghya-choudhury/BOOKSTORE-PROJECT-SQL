const Sequelize = require('sequelize');
const config = require('./config');

const { host, user, password, database, dialect } = config.db;

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
    port: 3306,
    logging: false,
});

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection to the DB been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the DB:', error);
//     }
// }

// testConnection();

module.exports = sequelize;
