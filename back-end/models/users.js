<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
    //TODO isAdmin for users/boolean
    return sequelize.define('users', {
        'username': DataTypes.STRING,
        'password': DataTypes.STRING,
        'date': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
=======
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('users',{
        'username':DataTypes.STRING,
        'email':DataTypes.STRING,
        'password':DataTypes.STRING,
        'token':DataTypes.STRING
    },{
        underscored:true
>>>>>>> master
    });
}