import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import weightRoutes from './routes/weightRoutes';
import shipmentRoutes from './routes/shipmentRoutes';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

// Create Express app
const app: express.Express = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://patient-dashboard.example.com'
        : 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/weight-history', weightRoutes);
app.use('/api', shipmentRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
