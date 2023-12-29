const express = require('express');
const router = express.Router();
const { getUsersReport,getUsersFaces,
    getUsersRegister,getUsersRegistro,
    getUsersUsers,getUsersLogin } = require('../controllers/userController');

router.get('/users/relatorio', getUsersReport);
router.get('/users/faces', getUsersFaces);
router.post('/users', getUsersUsers);
router.post('/users/register', getUsersRegister);
router.post('/users/login', getUsersLogin);
router.delete('/users/:registro', getUsersRegistro);

module.exports = router;
