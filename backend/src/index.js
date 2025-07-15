import express from 'express';
import connectDB from './db/mongoose';
import droneRoutes from './routes/droneRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect MongoDB
connectDB();

app.get('/health-check', (_req, res) => {
  res.send('Yes I am listening');
});

app.use('/', droneRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;

