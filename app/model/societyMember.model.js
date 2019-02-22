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
        societyMemberAddress: {
            type: Sequelize.STRING
        },
        contactNumber: {
            type: Sequelize.STRING
        },
        bankDetails: {
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