module.exports = (sequelize, Sequelize) => {
    const societyMember = sequelize.define('society_member_master', {
        societyMemberId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        societyName: {
            type: Sequelize.STRING
        },
        societyArea: {
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
        societyBoardNumber: {
            type: Sequelize.STRING
        },
        totalBoardNumbers: {
            type: Sequelize.STRING
        },
        societyMemberName:{
            type: Sequelize.STRING
        },
        societyMemberAddress:{
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