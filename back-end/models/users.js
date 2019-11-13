module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('users',{
        'username':DataTypes.STRING,
        'email':DataTypes.STRING,
        'password':DataTypes.STRING,
        'token':DataTypes.STRING
    },{
        underscored:true
    });
}