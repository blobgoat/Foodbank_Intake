import express, { Request, Response } from 'express';
import { intakes, uuidv4, Intake } from '../data/store';

const router = express.Router();

// POST /api/intake - Submit an intake record
router.post('/', (req: Request, res: Response) => {
  const { clientId, items, notes } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: 'clientId is required' });
  }

  const record: Intake = {
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

export default router;
