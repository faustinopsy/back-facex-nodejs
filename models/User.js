const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: String,
    registro: String,
    email: String,
    senha: String,
    rosto: [[Number]]
});

class User {
    async verifyPassword(password) {
        return bcrypt.compare(password, this.senha);
    }

    static async findByRegistro(registro) {
        return this.findOne({ registro: registro });
    }

    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
    }
}

userSchema.loadClass(User);

userSchema.pre('save', async function(next) {
    if (this.isModified('senha')) {
        await this.hashPassword();
    }
    next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
