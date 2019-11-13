let sequelize = require('./db.js');

const Users = sequelize.import('./users.js');
const transportType = sequelize.import('./transportType.js');

module.exports={
    sequelize,
    Users,
    transportType
}