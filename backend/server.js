import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/connectDB.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRouter.js';
import patientRoutes from './routes/patientRouter.js';
import appointmentRoutes from './routes/appointmentRouter.js';
import medicalRecordRoutes from './routes/medicalRecordRouter.js';
import staffRoutes from './routes/userRouter.js';
import reportRoutes from './routes/reportRouter.js'

import contactRouter from "./routes/contactRouter.js"

dotenv.config()

// Load env vars (in production, use proper env file)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
connectDB();

const app = express();


// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:4000',
//   credentials: true
// }));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/departments', departmentRoutes)
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reports', reportRoutes);
app.use("/api/contact", contactRouter)

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CUMAN Hospital Management System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      patients: '/api/patients',
      appointments: '/api/appointments',
      medicalRecords: '/api/medical-records',
      staff: '/api/staff'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handler middleware (must be after routes)
app.use(errorHandler);

// Handle unhandled routes
app.all(/.*/, (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🏥 CUMAN Hospital Management System`);
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

export default app;

