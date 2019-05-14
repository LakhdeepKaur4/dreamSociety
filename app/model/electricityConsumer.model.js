module.exports = (sequelize, Sequelize) => {
  const ElectricityConsumer = sequelize.define('electricity_consumer_master', {
    electricityConsumerId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    startDate: {
      type: Sequelize.DATEONLY,
    },
    endDate: {
      type: Sequelize.DATEONLY,
    },
    lastReading: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    rate: {
      type: Sequelize.INTEGER,
    },
    amountDue: {
      type: Sequelize.BOOLEAN,
    },
    mdi: {
      type: Sequelize.INTEGER,
    },
    entryDate: {
      type: Sequelize.DATEONLY,
    },
    lastReadingDate: {
      type: Sequelize.DATEONLY,
    },
    sanctionedLoad: {
      type: Sequelize.FLOAT,
    },
    currentReading: {
      type: Sequelize.INTEGER,
    },
    unitConsumed: {
      type: Sequelize.INTEGER,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    monthlyCharge: {
      type: Sequelize.FLOAT,
    }
  });

  return ElectricityConsumer;
}