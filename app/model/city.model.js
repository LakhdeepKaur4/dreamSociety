module.exports = (sequelize, Sequelize) => {
	const City = sequelize.define('city_master', {
	cityId:{
			type: Sequelize.INTEGER,
			autoIncrement:true,
			primaryKey:true
		},
	  cityName: {
		  type: Sequelize.STRING,
		  unique: true,
		  unique:'compositeIndex'
	  },
		isActive:{
			type:Sequelize.BOOLEAN,
			defaultValue: true
		}, 
		createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            defaultValue: null,
            type: Sequelize.DATE
        }
	},{
    freezeTableName: true
});
	
	return City;
}