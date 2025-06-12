const express = require('express');
const { sendOTP } = require('../services/email.service');
const router = express.Router();

// Store OTPs in memory (in production, use Redis or similar)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(email, {
      otp,
      expiry
    });

    // Send OTP via email
    await sendOTP(email, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      expiry: new Date(expiry)
    });
  } catch (err) {
    console.error('OTP send error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: err.message
    });
  }
});

// Verify OTP
router.post('/verify', (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ message: 'No OTP found for this email' });
    }

    if (Date.now() > storedData.expiry) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (otp !== storedData.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear OTP after successful verification
    otpStore.delete(email);

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (err) {
    console.error('OTP verify error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: err.message
    });
  }
});

module.exports = router; 