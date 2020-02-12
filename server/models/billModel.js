/**
 * @file billModel.js
 * @author Ripan Halder
 * @version  3.0
 * @since 01/26/2020
 */
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    owner_id: {
      allowNull: false,
      type: DataTypes.UUID,
      noUpdate: true
    },
    vendor: {
      type: DataTypes.STRING
    },
    bill_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    },
    amount_due: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    paymentStatus: {
      type: DataTypes.ENUM("paid", "due", "past_due", "no_payment_required")
    },
    attachment: {
      type: DataTypes.UUID,
      references: { 
        model: 'File',
        key: 'id'
      }
    }
  });
  return Bill;
};
