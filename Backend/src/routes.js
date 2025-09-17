const express = require('express');
const router = express.Router();

const { publishToInput } = require('./rabbit');
const store = require('./store');

// API routes

router.post('/api/notify', async (req, res) => {
    try {
        const { messageId, messageContent } = req.body;

        if (!messageId || !messageContent || messageContent.trim() === '') {
            return res.status(400).json({ error: 'messageContent is required' });
        }

        await publishToInput({ messageId, messageContent });
        store.setStatus(messageId, 'PENDING');

        return res.status(202).json({ messageId });
    } catch (err) {
        console.error(err);

        return res.status(500).json({ error: 'internal error' });
    }
});


router.get('/api/notification/status/:id', (req, res) => {
    const id = req.params.id;
    const status = store.getStatus(id) || 'NOT_FOUND';

    res.json({ messageId: id, status });
});


module.exports = router;