import express from 'express';
const router = express.Router();

// GET /profile
router.get('/', (req, res) => {
  res.json({ message: 'Profile route is working!' });
});

// Add more profile-related routes as needed
// Example: GET /profile/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({ message: `Profile data for user ${userId}` });
});

export default router;
