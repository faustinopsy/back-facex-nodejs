const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data_hora: Date,
    tipo: String
});

module.exports = mongoose.model('Presence', presenceSchema);
