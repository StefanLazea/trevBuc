let sequelize = require('./db.js');

const Users = sequelize.import('./users.js');

const Reviews = sequelize.import('./reviews.js');

module.exports={
    sequelize,
    Users,
    Reviews
}

