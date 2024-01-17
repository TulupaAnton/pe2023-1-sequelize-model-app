const { Router } = require('express');
const { usersController } = require('../controllers');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(usersController.getUsers)
  .post(usersController.createUsers);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUsersById)
  .delete(usersController.deleteUsersById);

module.exports = usersRouter;
