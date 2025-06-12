import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  Divider,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Favorite as DonorIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const RecipientDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    daysWaiting: 0,
    potentialMatches: 0,
    activeRequests: 0,
    lastUpdate: null,
  });

  const [urgentRequests, setUrgentRequests] = useState([
    {
      id: 1,
      bloodType: 'Rh-null',
      urgency: 'high',
      location: 'Delhi',
      time: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      bloodType: 'Bombay',
      urgency: 'medium',
      location: 'Mumbai',
      time: '1 day ago',
      status: 'pending',
    },
  ]);

  const [potentialDonors, setPotentialDonors] = useState([
    {
      id: 1,
      name: 'John Doe',
      bloodType: 'Rh-null',
      location: 'Delhi',
      distance: '5 km',
      lastDonation: '3 months ago',
      compatibility: 95,
    },
    {
      id: 2,
      name: 'Jane Smith',
      bloodType: 'Rh-null',
      location: 'Gurgaon',
      distance: '15 km',
      lastDonation: '6 months ago',
      compatibility: 85,
    },
  ]);

  const [mlResult, setMlResult] = useState(null);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState('');

  useEffect(() => {
    // Fetch recipient statistics and matches
    // This would be replaced with actual API calls
    setStats({
      daysWaiting: 15,
      potentialMatches: 3,
      activeRequests: 2,
      lastUpdate: '2024-03-15',
    });
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const handleGetPrediction = async () => {
    setMlLoading(true);
    setMlError('');
    setMlResult(null);
    try {
      // Example: use the first potential donor and recipient info
      const donor = potentialDonors[0] || {
        id: 'd1',
        bloodType: 'Bombay',
        age: 32,
        location: 'Mumbai',
        geneticMarkers: ['A1', 'B2'],
      };
      const recipient = {
        id: user?.id || 'r1',
        bloodType: donor.bloodType,
        age: user?.age || 28,
        urgency: 'high',
        location: donor.location,
        geneticMarkers: ['A1', 'B2'],
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ml/predict`,
        {
          donor: {
            id: donor.id,
            blood_type: donor.bloodType,
            age: donor.age,
            location: donor.location,
            genetic_markers: donor.geneticMarkers || [],
          },
          recipient: {
            id: recipient.id,
            blood_type: recipient.bloodType,
            age: recipient.age,
            urgency: recipient.urgency,
            location: recipient.location,
            genetic_markers: recipient.geneticMarkers || [],
          },
        }
      );
      setMlResult(response.data);
    } catch (err) {
      setMlError('ML prediction failed.');
    } finally {
      setMlLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                mr: 2,
              }}
            >
              <HospitalIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome back, {user?.firstName || 'Recipient'}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We're working to find the best matches for you.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Days Waiting
              </Typography>
              <Typography variant="h4">{stats.daysWaiting}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Potential Matches
              </Typography>
              <Typography variant="h4">{stats.potentialMatches}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Requests
              </Typography>
              <Typography variant="h4">{stats.activeRequests}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Last Update
              </Typography>
              <Typography variant="h4">
                {stats.lastUpdate
                  ? new Date(stats.lastUpdate).toLocaleDateString()
                  : 'Never'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Urgent Requests */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Urgent Requests
            </Typography>
            {urgentRequests.length === 0 ? (
              <Alert severity="info">No urgent requests at the moment.</Alert>
            ) : (
              <List>
                {urgentRequests.map((request, index) => (
                  <React.Fragment key={request.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'error.main' }}>
                          <WarningIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${request.bloodType} Blood Required`}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              size="small"
                              label={request.urgency}
                              color={getUrgencyColor(request.urgency)}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                              <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                              {request.location}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                              <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                              {request.time}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < urgentRequests.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Potential Donors */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Potential Donors
            </Typography>
            {potentialDonors.length === 0 ? (
              <Alert severity="info">No potential donors found yet.</Alert>
            ) : (
              <List>
                {potentialDonors.map((donor, index) => (
                  <React.Fragment key={donor.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <DonorIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={donor.name}
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Chip
                                size="small"
                                label={donor.bloodType}
                                color="primary"
                                variant="outlined"
                              />
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {donor.location} ({donor.distance})
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Compatibility:
                              </Typography>
                              <Box sx={{ flexGrow: 1, mx: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={donor.compatibility}
                                  color={getCompatibilityColor(donor.compatibility)}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {donor.compatibility}%
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        Contact
                      </Button>
                    </ListItem>
                    {index < potentialDonors.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<HospitalIcon />}
                >
                  New Request
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<LocationIcon />}
                >
                  View Nearby Donors
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<TimeIcon />}
                >
                  Update Status
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<DonorIcon />}
                >
                  View Matches
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ML Prediction Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              ML Survival Prediction
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGetPrediction}
              disabled={mlLoading}
              sx={{ mb: 2 }}
            >
              {mlLoading ? 'Predicting...' : 'Get Survival Prediction'}
            </Button>
            {mlError && <Alert severity="error">{mlError}</Alert>}
            {mlResult && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Survival Score:</strong> {mlResult.survival_score}
                </Typography>
                <Typography variant="body1">
                  <strong>Allocation Decision:</strong> {mlResult.allocation_decision}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mlResult.explanation}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipientDashboard; 