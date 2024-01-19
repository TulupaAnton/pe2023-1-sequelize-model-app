const { Router } = require('express');
const { usersController } = require('../controllers');
const { paginate } = require('../middleware');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(paginate.paginateUsers, usersController.getUsers)
  .post(usersController.createUsers);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUsersById)
  .put(usersController.updateOrCreateUser, usersController.createUsers)
  .delete(usersController.deleteUsersById);

module.exports = usersRouter;
