const express = require('express');
const User = require('../models/User');
const router = express.Router();

// List all donors
router.get('/', async (req, res) => {
  try {
    const donors = await User.find({ userType: 'donor' });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donors', error: err.message });
  }
});

// Get donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await User.findOne({ _id: req.params.id, userType: 'donor' });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donor', error: err.message });
  }
});

// Update donor
router.put('/:id', async (req, res) => {
  try {
    const donor = await User.findOneAndUpdate(
      { _id: req.params.id, userType: 'donor' },
      req.body,
      { new: true }
    );
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update donor', error: err.message });
  }
});

// Delete donor
router.delete('/:id', async (req, res) => {
  try {
    const donor = await User.findOneAndDelete({ _id: req.params.id, userType: 'donor' });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ message: 'Donor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete donor', error: err.message });
  }
});

module.exports = router; 