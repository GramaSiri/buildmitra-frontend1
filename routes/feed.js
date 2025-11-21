// routes/feed.js
import express from 'express';
const router = express.Router();

// Sample GET route for feed
router.get('/', (req, res) => {
  res.json({
    message: '📢 Feed route is working!',
    timestamp: new Date(),
  });
});

// You can add more routes here, like POST for new feed items

export default router;
