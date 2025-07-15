import express from 'express';
import connectDB from './db/mongoose';
import droneRoutes from './routes/droneRoute';
import dotenv from 'dotenv';
import http from 'http';
import mockTelemetry from './sockets/mockTelemetry';
import connectionHandling from './sockets/connectionHandling';
import { WebSocketServer } from 'ws';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect MongoDB
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/socket-test', (_req, res) => {
  res.render('index');
});

app.get('/health-check', (_req, res) => {
  res.send('Yes I am listening');
});

app.use('/', droneRoutes);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

connectionHandling(wss);
mockTelemetry(wss);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;

