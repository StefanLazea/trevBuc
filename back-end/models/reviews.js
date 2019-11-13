module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('reviews',{
        'leaving_point':DataTypes.STRING,
        'arriving_point':DataTypes.STRING,
        'leaving_hour':DataTypes.STRING,
        'duration':DataTypes.INTEGER,
        'observations':DataTypes.STRING,
        'rating':DataTypes.STRING,
        'congestion_level':DataTypes.INTEGER
    },{
        underscored:true
    });
}