module.exports = (sequelize, Sequelize) => {
    const UserFacility = sequelize.define('user_facility_master', {
        userFacilityId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        duration: {
            type: Sequelize.STRING,
        },
        startDate: {
            type: Sequelize.DATEONLY,
        },
        endDate: {
            type: Sequelize.DATEONLY,
        }
    }, {
            freezeTableName: true
        });

    return UserFacility;
}