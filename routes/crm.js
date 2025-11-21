import express from 'express';
import CRMLead from '../models/CRMLead.js';

const router = express.Router();

// ✅ Log a new CRM entry
router.post('/log', async (req, res) => {
  try {
    const { referenceId, userName, module, status = 'Created' } = req.body;
    const lead = new CRMLead({ referenceId, userName, module, status });
    await lead.save();
    res.json({ success: true, message: 'CRM entry logged' });
  } catch (err) {
    res.status(500).json({ error: 'CRM logging failed' });
  }
});

// ✅ Fetch all CRM leads (optional filters)
router.get('/all', async (req, res) => {
  try {
    const { userName, module } = req.query;
    const query = {};
    if (userName) query.userName = userName;
    if (module) query.module = module;

    const leads = await CRMLead.find(query).sort({ timestamp: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch CRM leads' });
  }
});

// ✅ Update status of a CRM entry
router.put('/update-status', async (req, res) => {
  try {
    const { referenceId, status } = req.body;
    const result = await CRMLead.updateOne({ referenceId }, { status });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Reference ID not found' });
    }
    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

export default router;
