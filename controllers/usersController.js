const { hashSync } = require('bcrypt');
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

    const crestedUser = await User.create(body);
    if (!crestedUser) {
      return res.status(400).send('Somthing went wrong');
    }
    res.status(201).send(crestedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUsersById = async (req, res, next) => {};

module.exports.deleteUsersById = async (req, res, next) => {};
