const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE);

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes (to be implemented)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/donors', require('./routes/donor.routes'));
app.use('/api/recipients', require('./routes/recipient.routes'));
app.use('/api/matches', require('./routes/match.routes'));
app.use('/api/ml', require('./routes/ml.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/otp', require('./routes/otp.routes'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'RarePair API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 