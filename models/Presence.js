const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
    id_usuario: String,
    data_hora: Date,
    tipo: String
});

const presence = mongoose.model('Presence', presenceSchema);
module.exports = presence;