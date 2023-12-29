const express = require('express');
const presencesRouter = express.Router();
const PresenceController = require('../controllers/presenceController');

presencesRouter.post('/presences', PresenceController.postPresence);
presencesRouter.get('/presences', PresenceController.getPresence);
presencesRouter.put('/presences/:id', PresenceController.putPresence);

module.exports = presencesRouter;
