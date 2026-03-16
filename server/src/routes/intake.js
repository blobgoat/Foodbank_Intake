const express = require('express');
const router = express.Router();
const { intakes, uuidv4 } = require('../data/store');

// POST /api/intake - Submit an intake record
router.post('/', (req, res) => {
  const { clientId, items, notes } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: 'clientId is required' });
  }

  const record = {
    id: `INT-${uuidv4().slice(0, 6).toUpperCase()}`,
    clientId,
    items: items || [],
    notes: notes || '',
    date: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  };

  intakes.push(record);
  res.status(201).json({ intakeId: record.id, message: 'Intake recorded successfully' });
});

module.exports = router;
