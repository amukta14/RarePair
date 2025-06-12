const express = require('express');
const router = express.Router();

// Placeholder route for recipients
router.get('/', (req, res) => {
  res.json({ message: 'Recipient endpoint' });
});

module.exports = router; 