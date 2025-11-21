import express from 'express';
const router = express.Router();

// Example: GET /affiliate
router.get('/', (req, res) => {
  res.json({ message: 'Affiliate route is working!' });
});

// Example: GET /affiliate/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Affiliate details for ID: ${id}` });
});

export default router;
