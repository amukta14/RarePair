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
  Alert,
} from '@mui/material';
import {
  Favorite as DonorIcon,
  LocalHospital as HospitalIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonations: 0,
    livesSaved: 0,
    activeRequests: 0,
    lastDonation: null,
  });
  const [donorData, setDonorData] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchDonorData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/donors/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonorData(response.data);
      } catch (err) {
        setError('Failed to fetch donor data');
        console.error('Error fetching donor data:', err);
      }
    };

    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches/search?donorId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMatches(response.data);
      } catch (err) {
        setError('Failed to fetch matches');
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
    fetchMatches();
  }, [user, navigate]);

  useEffect(() => {
    // Fetch donor statistics and recent matches
    // This would be replaced with actual API calls
    setStats({
      totalDonations: 5,
      livesSaved: 3,
      activeRequests: 2,
      lastDonation: '2024-03-15',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
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
              <DonorIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome back, {donorData?.firstName || 'Donor'}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Thank you for being a part of our life-saving community.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Donations
              </Typography>
              <Typography variant="h4">{stats.totalDonations}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Lives Saved
              </Typography>
              <Typography variant="h4">{stats.livesSaved}</Typography>
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
                Last Donation
              </Typography>
              <Typography variant="h4">
                {stats.lastDonation
                  ? new Date(stats.lastDonation).toLocaleDateString()
                  : 'Never'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Matches */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Matches
            </Typography>
            {matches.length > 0 ? (
              <List>
                {matches.map((match) => (
                  <ListItem key={match._id}>
                    <ListItemText
                      primary={`Match with ${match.recipient?.firstName || 'Unknown'} ${match.recipient?.lastName || ''}`}
                      secondary={`Status: ${match.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                No recent matches found.
              </Typography>
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
                  startIcon={<DonorIcon />}
                >
                  Update Availability
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<LocationIcon />}
                >
                  View Nearby Requests
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<TimeIcon />}
                >
                  Schedule Donation
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<HospitalIcon />}
                >
                  View History
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DonorDashboard; 