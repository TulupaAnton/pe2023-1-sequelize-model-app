const { Router } = require('express');
const usersRouter = require('./userRouter');

const router = Router();

router.use('/users', usersRouter);

module.exports = router;
