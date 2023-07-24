require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DATABASE_URL);

class User extends Model {}

User.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    }
  },
  tier: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  tradingEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'User'
});

sequelize.sync();

module.exports = {
  User
};
