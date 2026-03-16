const express = require('express');
const cors = require('cors');
const clientsRouter = require('./src/routes/clients');
const inventoryRouter = require('./src/routes/inventory');
const intakeRouter = require('./src/routes/intake');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/clients', clientsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/intake', intakeRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Food Bank API server running on port ${PORT}`);
  });
}

module.exports = app;
