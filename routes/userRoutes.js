const express = require('express');
const userRoutes = express.Router();
const UserController = require('../controllers/userController');

userRoutes.get('/users/relatorio', UserController.getUsersReport);
userRoutes.get('/users/faces', UserController.getUsersFaces);
userRoutes.delete('/users/:registro', UserController.getUsersRegistro);
userRoutes.post('/users', UserController.getUsersUsers);
userRoutes.post('/users/login', UserController.getUsersLogin);
userRoutes.post('/users/register', UserController.getUsersRegister);

module.exports = userRoutes;
