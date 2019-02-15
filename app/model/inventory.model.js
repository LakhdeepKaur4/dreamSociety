module.exports = (sequelize, Sequelize) => {
	const Inventory = sequelize.define('inventory_master', {
	  inventoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      serialNumber:{
        type: Sequelize.STRING,
      },
      rate:{
        type:Sequelize.FLOAT,
        defaultValue: true
      }, 
	});
	
	return Rate;
}