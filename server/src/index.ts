import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed.js';

import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware configuration
app.use(
  cors({
    origin: '*', // Allow all origins for dev/localhost flexibility
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check API
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    business: 'Sri Kannathal Home Care & Nursing Service',
    time: new Date().toISOString(),
  });
});

// API Routes Mount
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Global 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server and Auto-Seed
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`
======================================================
  Sri Kannathal Home Care & Nursing Service Server
  Status: RUNNING
  Port: ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  Local URL: http://localhost:${PORT}
  API Endpoint: http://localhost:${PORT}/api
======================================================
      `);
    });
  } catch (err: any) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();
