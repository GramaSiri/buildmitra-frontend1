import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Debugging line (optional, remove once confirmed working)
console.log('MongoDB URI:', process.env.MONGO_URI);

// Import Routes
import authRoutes from './routes/auth.js';
import contractorRoutes from './routes/contractor.js';
import labourRoutes from './routes/labour.js';
import materialRoutes from './routes/material.js';
import projectRoutes from './routes/project.js';
import vendorRoutes from './routes/vendor.js';
import drawingRoutes from './routes/drawing.js';
import feedRoutes from './routes/feed.js';
import chatRoutes from './routes/chat.js';
import profileRoutes from './routes/profile.js';
import propertyRoutes from './routes/property.js';
import affiliateRoutes from './routes/affiliate.js';
import quizRoutes from './routes/quiz.js';
import searchRoutes from './routes/search.js';
import crmRoutes from './routes/crm.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route (fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.send('🚀 BuildMitra Backend is running!');
});

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/labour', labourRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/vendor', vendorRoutes); // Alias
app.use('/api/drawing', drawingRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/affiliate', affiliateRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/crm', crmRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Correct mongoose connection (no deprecated options)
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // optional, keeps connection attempts short
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});