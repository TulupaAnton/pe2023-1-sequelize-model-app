'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  // unique,allowNull,validate
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { is: /^[A-Z][a-z]+$/, len: [2, 64] },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: /^[A-Z][a-z]+$/ },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      passwHash: { type: DataTypes.STRING, allowNull: false },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: { isBefore: new Date().toISOString() },
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: [['male', 'femele', 'other']],
        },
      },
      image: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
