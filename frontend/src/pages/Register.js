import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import OTPVerification from '../components/OTPVerification';

const steps = ['Account Details', 'Personal Information', 'Medical Information'];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Account Details
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',

    // Personal Information
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Medical Information
    bloodType: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleVerificationComplete = (email) => {
    setVerifiedEmail(email);
    setShowOTP(false);
    // Pre-fill email in registration form
    setFormData(prev => ({ ...prev, email }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email verification
    if (formData.email !== verifiedEmail) {
      setError('Please verify your email first');
      return;
    }

    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>I am a</InputLabel>
              <Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                label="I am a"
              >
                <MenuItem value="donor">Donor</MenuItem>
                <MenuItem value="recipient">Recipient</MenuItem>
                <MenuItem value="hospital">Hospital</MenuItem>
              </Select>
            </FormControl>
          </>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PIN Code"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Blood Type</InputLabel>
              <Select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                label="Blood Type"
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="Bombay">Bombay</MenuItem>
                <MenuItem value="Rh-null">Rh-null</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Medical History"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Current Medications"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              margin="normal"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {showOTP ? (
        <OTPVerification onVerificationComplete={handleVerificationComplete} />
      ) : (
        <>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Register
            </Typography>
            
            {/* Add email verification button */}
            <Box sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowOTP(true)}
                sx={{ mb: 2 }}
              >
                Verify Email
              </Button>
              {verifiedEmail && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Email verified: {verifiedEmail}
                </Alert>
              )}
            </Box>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {activeStep === steps.length - 1
                    ? loading
                      ? 'Creating Account...'
                      : 'Create Account'
                    : 'Next'}
                </Button>
              </Box>
            </form>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Register; 