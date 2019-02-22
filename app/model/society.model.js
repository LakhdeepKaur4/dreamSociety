module.exports = (sequelize, Sequelize) => {
	const Society = sequelize.define('society_master', {
		societyId: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		societyName: {
			type: Sequelize.STRING
		},
		societyAddress: {
            type: Sequelize.STRING
        },
        registrationNumber: {
            type: Sequelize.STRING
        },
        bankDetails: {
            type: Sequelize.STRING
        },
        totalBoardNumbers: {
            type: Sequelize.STRING
        },
		isActive: {
			type: Sequelize.BOOLEAN,
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
	}, {
		freezeTableName: true
	});

	return Society;
}