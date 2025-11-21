// routes/chat.js
import express from 'express';
const router = express.Router();

// Example GET route for chat
router.get('/', (req, res) => {
  res.json({
    message: '💬 Chat route is working!',
    timestamp: new Date(),
  });
});

// You can add POST routes for sending messages, etc.

export default router;
