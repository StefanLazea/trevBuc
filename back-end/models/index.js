let sequelize = require('./db.js');

const Users = sequelize.import('./users.js');
const transportType = sequelize.import('./transportType.js');

const Reviews = sequelize.import('./reviews.js');

//an user can have n reviews
Users.hasMany(Reviews, { onDelete: 'cascade' });
//in order to go from an review to a user using sequelize method
Reviews.belongsTo(Users, { onDelete: 'cascade' });
//an review belongs to a transport type
//for every review this will specify the transport_type_id in Reviews table
Reviews.belongsTo(transportType, { onDelete: 'cascade' });

module.exports = {
    sequelize,
    Users,
    Reviews,
    transportType
}
