const express = require('express');
const Match = require('../models/Match');
const router = express.Router();

// List all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('donor recipient');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch matches', error: err.message });
  }
});

// Get match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('donor recipient');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch match', error: err.message });
  }
});

// Create match
router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create match', error: err.message });
  }
});

// Update match
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update match', error: err.message });
  }
});

// Delete match
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete match', error: err.message });
  }
});

// Advanced search: find matches by donor or recipient
router.get('/search', async (req, res) => {
  try {
    const { donorId, recipientId } = req.query;
    const query = {};
    if (donorId) query.donor = donorId;
    if (recipientId) query.recipient = recipientId;
    const matches = await Match.find(query).populate('donor recipient');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

module.exports = router; 