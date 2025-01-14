const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('./../models');

// // Шиифрування
// "123"->'fgfsgaglkdglakslkdwsl'
// "123"<-'fgfsgaglkdglakslkdwsl'
// // хешуванняя
// "123"->"adslfaksflskfalfkaslf"

// const passw = '12345';
// const passwHash = hashSync(passw, HASH_SALT);
// console.log('passwHash :>> ', passwHash);

module.exports.createUsers = async (req, res, next) => {
  const { body } = req;

  try {
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
  const { limit, offset } = req.pagination;
  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      order: ['id'],
    });
    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUsers = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
    });

    if (!foundUsers) {
      return res.status(404).send([{ status: 404, message: 'User not Found' }]);
    }
    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next();
  }
};

module.exports.updateUsersById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const [updatedUsersCount, [updatedUsers]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      return res.status(404).send([{ status: 404, title: 'User not Found' }]);
    }

    const preparedUser = _.omit(updatedUsers, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next();
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  // первірити чи існує
  // + оновити
  //- створити
  // спробувати оновити
  // якщо updatedUsersCount ===1, то все,200
  // якщо updatedUsersCount ===0, то створити ,201

  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      body.id = id;
      return next();
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next();
  }
};

module.exports.deleteUsersById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUserCount = await User.destroy({ where: { id } });
    if (!deletedUserCount) {
      return res.status(404).send([{ status: 404, title: 'User not Found' }]);
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
