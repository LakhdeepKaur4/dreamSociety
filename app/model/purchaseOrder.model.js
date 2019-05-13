module.exports = (sequelize, Sequelize) => {
    const PurchaseOrder = sequelize.define('purchaseOrder_master', {
          purchaseOrderId: {
                type: Sequelize.INTEGER,
                // autoIncrement: true,
                primaryKey: true
          },
          VendorName: {
                type: Sequelize.STRING,
                allowNull: false
          },
          VendorLastName: {
                type: Sequelize.STRING,
                allowNull: false
          },
          userName: {
                type: Sequelize.STRING,
                allowNull: false
          },
          dob: {
                type: Sequelize.STRING,
                allowNull: false
          },
          email: {
                type: Sequelize.STRING,
                allowNull: false
          },
          contact: {
                type: Sequelize.STRING,
                allowNull: false
          },
          // aadharCardNumber: {
          //       type: Sequelize.STRING,
          //       allowNull: false
          // },
          password: {
                type: Sequelize.STRING,
                allowNull: false
          },
          picture: {
                type: Sequelize.STRING,
          },
          gender: {
                type: Sequelize.STRING,
                allowNull: false
          },
          permanentAddress: {
                type: Sequelize.STRING,
                allowNull: false
          },
          correspondenceAddress: {
                type: Sequelize.STRING,
                allowNull: false
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
          panCardNumber: {
                type: Sequelize.STRING
          },
          IFSCCode: {
                type: Sequelize.STRING
          },
          adhaarCardNo:{
                type: Sequelize.STRING,
                allowNull: false
          },
          noOfMembers: {
                type: Sequelize.INTEGER,
                allowNull: false
          },
          isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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

    return PurchaseOrder;
}