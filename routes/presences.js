// routes/presences.js
const express = require('express');
const router = express.Router();
const Presence = require('../models/Presence');

router.post('/presences', async (req, res) => {
    try {
        const newPresence = new Presence({
            id_usuario: req.body.id,
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
            query['registro'] = req.query.registro;
        }
        if (req.query.data) {
            query['data_hora'] = { $gte: new Date(req.query.data) };
        }

        const presencas = await Presence.find(query);
        res.json({ presencas: presencas });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/presences/:id', async (req, res) => {
    try {
        const presence = await Presence.findById(req.params.id);
        if (presence) {
            presence.novaDataHora = req.body.novaDataHora || presence.novaDataHora;
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
