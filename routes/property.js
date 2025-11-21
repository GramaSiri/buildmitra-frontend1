import express from 'express';
const router = express.Router();

// Example: GET /property
router.get('/', (req, res) => {
  res.json({ message: 'Property route is working!' });
});

// Example: GET /property/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Property details for ID: ${id}` });
});

export default router;
