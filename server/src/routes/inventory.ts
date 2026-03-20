import express, { Request, Response } from 'express';
import { inventory } from '../data/store';

const router = express.Router();

// GET /api/inventory - Get all available inventory items
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;

  const items = typeof category === 'string' && category
    ? inventory.filter((item: any) => item.category.toLowerCase() === category.toLowerCase())
    : inventory;

  res.json({ items });
});

export default router;
