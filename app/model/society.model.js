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
	    contactNumber: {
            type: Sequelize.STRING
        },
        registrationNumber: {
            type: Sequelize.STRING
        },
        totalBoardMembers: {
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