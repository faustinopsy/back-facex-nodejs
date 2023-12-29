const express = require('express');
const router = express.Router();
const { postPresence,getPresence,
    putPresence } = require('../controllers/presenceController');

router.get('/presences', getPresence);
router.put('/presences/:id', putPresence);
router.post('/presences', postPresence);
module.exports = router;