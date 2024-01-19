'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');
const { GENDERS } = require('./../constants');

const HASH_SALT = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {}
  }

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
      passwHash: {
        type: DataTypes.STRING,
        allowNull: false,
        set (value) {
          this.setDataValue('passwHash', hashSync(value, HASH_SALT));
        },
      },

      birthday: {
        type: DataTypes.DATEONLY,
        validate: { isBefore: new Date().toISOString() },
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: [GENDERS],
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
