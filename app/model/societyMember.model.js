module.exports = (sequelize, Sequelize) => {
    const societyMember = sequelize.define('society_member_master', {
        societyMemberId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        societyMemberName: {
            type: Sequelize.STRING
        },
        currentAddress: {
            type: Sequelize.STRING
        },
        permanentAddress: {
            type: Sequelize.STRING
        },
        contactNumber: {
            type: Sequelize.STRING
        },
        panCardNumber:{
            type: Sequelize.STRING
        },
        bankName: {
            type: Sequelize.STRING
		},
		accountHolderName: {
            type: Sequelize.STRING
		},
		accountNumber: {
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

    return societyMember;
}