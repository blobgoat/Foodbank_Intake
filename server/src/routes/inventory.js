const express = require('express');
const router = express.Router();
const { inventory } = require('../data/store');

// GET /api/inventory - Get all available inventory items
router.get('/', (req, res) => {
  const { category } = req.query;

  const items = category
    ? inventory.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    : inventory;

  res.json({ items });
});

module.exports = router;
