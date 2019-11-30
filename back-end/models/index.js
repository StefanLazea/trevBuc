let sequelize = require('./db.js');

const Users = sequelize.import('./users.js');
const transportType = sequelize.import('./transportType.js');

const Reviews = sequelize.import('./reviews.js');

module.exports={
    sequelize,
    Users,
    Reviews,
    transportType
}
