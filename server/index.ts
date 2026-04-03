/* eslint-disable no-undef */
import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
// import clientsRouter from './src/routes/clients.js';
// import inventoryRouter from './src/routes/inventory.js';
// import intakeRouter from './src/routes/intake.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => res.json({ status: 'ok' }));

// API routes
// app.use('/api/clients', clientsRouter);
// app.use('/api/inventory', inventoryRouter);
// app.use('/api/intake', intakeRouter);
app.use('/api/test', (_req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// if (import.meta.url === `file://${process.argv[1]}`) {
app.listen(PORT, () => {
  console.log(`Food Bank API server running on port ${PORT}`);
});


export default app;
