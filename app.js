const express = require('express');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(express.json());

app.use(errorHandlers.dbErrorHandler);

module.exports = app;

// Add endpoints handlers
//GET /api/users{}
//GET /api/users
//GET /api/users/1
//GET /api/users/1{}
//DELETE /api/users/1
