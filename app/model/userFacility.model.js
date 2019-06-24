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
    }, {
            freezeTableName: true
        });

    return UserFacility;
}