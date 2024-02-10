const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
    id_usuario: String,
    data_hora: Date,
    tipo: String
});

class Presence {
    static async findPresencesByUserId(userId) {
        return this.find({ id_usuario: userId });
    }

    isToday() {
        const today = new Date();
        return this.data_hora.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    }
}

presenceSchema.loadClass(Presence);

const presenceModel = mongoose.model('Presence', presenceSchema);

module.exports = presenceModel;
