let Sequelize = require('sequelize');
let config = require('../configuration.json');

const sequelize = new Sequelize(
    'wb_transport',
    config.db_user,
    '',
    {
        dialect: 'mysql',
        host: "localhost",
        charset: 'utf8',
          collate: 'utf8_general_ci',
        define: {
           timestamps: false
        }
    }
);

module.exports = sequelize;