const express = require('express');
const router = express.Router();

// Placeholder route for file upload
router.post('/', (req, res) => {
  res.json({ message: 'File upload endpoint' });
});

module.exports = router; 