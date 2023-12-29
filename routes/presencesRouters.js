const express = require('express');
const router = express.Router();
const Presence = require('../models/Presence');
const User = require('../models/User');

router.post('/presences', async (req, res) => {
    try {
        const newPresence = new Presence({
            id_usuario: req.body.id_usuario,
            tipo: req.body.tipo,
            data_hora: new Date() 
        });
        const savedPresence = await newPresence.save();
        res.status(201).json({ status: true, presenca: savedPresence });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/presences', async (req, res) => {
    try {
        let query = {};
        if (req.query.registro) {
            const user = await User.findOne({ registro: req.query.registro });
            if (user) {
                query['id_usuario'] = user._id.toString();
            } else {
                return res.status(404).json({ message: "Usuário não encontrado para o registro fornecido" });
            }
        }
        if (req.query.data) {
            query['data_hora'] = { $gte: new Date(req.query.data) };
        }
        const presencas = await Presence.find(query);
        const presencasResponse = [];

        for (const presenca of presencas) {
            const user = await User.findById(presenca.id_usuario);
            presencasResponse.push({
                id: presenca._id.toString(),
                nome: user ? user.nome : 'Usuário não encontrado',
                registro: user ? user.registro : 'Registro não encontrado',
                data_hora: presenca.data_hora,
                tipo: presenca.tipo
            });
        }

        res.json({ presencas: presencasResponse });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.put('/presences/:id', async (req, res) => {
    try {
        const presence = await Presence.findById(req.params.id);
        
        if (presence) {
            presence.data_hora = req.body.novaDataHora || presence.novaDataHora;
            const updatedPresence = await presence.save();
            res.json({ status: true, presenca: updatedPresence });
        } else {
            res.status(404).json({ message: 'Presença não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
