let sequelize = require('./db.js');

const Users = sequelize.import('./users.js');

module.exports={
    sequelize,
    Users
}