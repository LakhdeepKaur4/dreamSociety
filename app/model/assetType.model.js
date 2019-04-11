module.exports = (sequelize, Sequelize) => {
	const AssetsType = sequelize.define('asset_type_master', {
	assetTypeId:{
			type: Sequelize.INTEGER,
			autoIncrement:true,
			primaryKey:true
		},
	  assetType: {
		  type: Sequelize.STRING
      },
      description:{
        type: Sequelize.STRING
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
	
	return AssetsType;
}