const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
    async getUsersReport(req, res) {
        try {
            const users = await User.find({}, 'id nome registro');
            res.json({ usuarios: users });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUsersFaces(req, res) {
        try {
            const users = await User.find({}, 'id nome registro rosto');
            const resultados = users.map(user => {
                return {
                    id: user.id,
                    nome: user.nome,
                    registro: user.registro,
                    faces: user.rosto
                };
            });
            res.json({ usuarios: resultados });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUsersRegistro(req, res) {
        try {
            const registro = req.params.registro;
            const user = await User.findOneAndDelete({ registro: registro });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado com o registro fornecido" });
            }

            res.status(200).json({ message: "Usuário excluído com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUsersUsers(req, res) {
        try {
            const { nome, registro, email, senha, rosto } = req.body;

            const existingUser = await User.findOne({ registro });
            if (existingUser) {
                return res.status(400).json({ message: "Registro já cadastrado" });
            }
            const newUser = new User({ nome, registro, email, senha, rosto });
            const savedUser = await newUser.save();

            res.status(201).json({ status: true, usuario: savedUser });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUsersLogin(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: "Usuário não encontrado" });
            }

            const validPassword = await bcrypt.compare(req.body.senha, user.senha);
            if (!validPassword) {
                return res.status(400).json({ message: "Senha incorreta" });
            }
            res.status(200).json({ status: true, message: "Login bem-sucedido" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUsersRegister(req, res) {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: "E-mail já cadastrado" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.senha, salt);

            const newUser = new User({
                ...req.body,
                senha: hashedPassword
            });

            const savedUser = await newUser.save();
            res.status(201).json({ status: true, usuario: savedUser });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new UserController();
