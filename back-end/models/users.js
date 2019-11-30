module.exports = (sequelize, DataTypes) => {
    //TODO isAdmin for users/boolean
    return sequelize.define('users', {
        'username': DataTypes.STRING,
        'password': DataTypes.STRING,
        'date': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
}