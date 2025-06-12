const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/ml/predict
router.post('/predict', async (req, res) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000/predict';
    const response = await axios.post(mlUrl, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('ML Service Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'ML service unavailable',
      error: error.message,
    });
  }
});

module.exports = router; 