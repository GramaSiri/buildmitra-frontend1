import express from 'express';
const router = express.Router();

// Example: GET /quiz
router.get('/', (req, res) => {
  res.json({ message: 'Quiz route is working!' });
});

// Example: GET /quiz/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Quiz details for ID: ${id}` });
});

export default router;
