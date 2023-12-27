const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: String,
    registro: String,
    email: String,
    senha: String,
    rosto: [[Number]] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
