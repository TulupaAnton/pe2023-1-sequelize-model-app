const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('./../models');

// // Шиифрування
// "123"->'fgfsgaglkdglakslkdwsl'
// "123"<-'fgfsgaglkdglakslkdwsl'
// // хешуванняя
// "123"->"adslfaksflskfalfkaslf"

// const passw = '12345';
const HASH_SALT = 10;
// const passwHash = hashSync(passw, HASH_SALT);
// console.log('passwHash :>> ', passwHash);

module.exports.createUsers = async (req, res, next) => {
  const { body } = req;

  try {
    body.passwHash = hashSync(body.passwHash, HASH_SALT);

    const createdUser = await User.create(body);
    if (!createdUser) {
      return res.status(400).send('Somthing went wrong');
    }

    // const preparedUser = { ...createdUser.get() };
    // delete preparedUser.passwHash;
    // delete preparedUser.createdAt;
    // delete preparedUser.updatedAt;

    const preparedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { page = 1, results = 10 } = req.query;
  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
      limit: results,
      offset: (page - 1) * results,
      order: ['id'],
    });
    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUsersById = async (req, res, next) => {};

module.exports.deleteUsersById = async (req, res, next) => {};
