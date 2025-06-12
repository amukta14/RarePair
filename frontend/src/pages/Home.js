import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Favorite as DonorIcon,
  Map as MapIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <DonorIcon sx={{ fontSize: 40 }} />,
    title: 'Rare Blood Matching',
    description: 'Find compatible rare blood donors quickly and efficiently.',
  },
  {
    icon: <HospitalIcon sx={{ fontSize: 40 }} />,
    title: 'Organ Transplant',
    description: 'ML-powered matching for organ transplants with high success rates.',
  },
  {
    icon: <MapIcon sx={{ fontSize: 40 }} />,
    title: 'Real-time Location',
    description: 'View nearby donors and recipients on an interactive map.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Secure & Private',
    description: 'Your medical data is protected with enterprise-grade security.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Saving Lives Through
                <br />
                Smart Matching
              </Typography>
              <Typography variant="h5" paragraph>
                India's first map-enabled platform for rare blood types and organ transplants.
                Connecting donors and recipients in real-time.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ mr: 2, mb: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/map')}
                >
                  View Map
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/hero-image.png"
                alt="Healthcare illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose RarePair?
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Our platform combines cutting-edge technology with healthcare expertise
          to save lives efficiently.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Join our community of donors and recipients today.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Register Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 