module.exports = (sequelize, Sequelize) => {
    const OwnerMembersDetail = sequelize.define('owner_members_detail', {
        memberId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        memberName: {
            type: Sequelize.STRING,
            allowNull:false
        },
        dob: {
            type: Sequelize.DATE,
            allowNull:false
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

    return OwnerMembersDetail;
}