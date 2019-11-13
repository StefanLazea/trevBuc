module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('transport_type',{
        'name':DataTypes.STRING,
        'type':DataTypes.STRING
    },{
        underscored:true
    });
}