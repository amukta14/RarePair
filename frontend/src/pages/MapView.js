import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Paper, Typography, Chip, IconButton, Drawer } from '@mui/material';
import {
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const donorIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const recipientIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map center changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapView = () => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Center of India
  const [zoom, setZoom] = useState(5);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    bloodType: 'all',
    urgency: 'all',
    type: 'all',
  });

  // Mock data - replace with actual API calls
  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: [19.0760, 72.8777], // Mumbai
      type: 'donor',
      bloodType: 'Bombay',
      name: 'John Doe',
      urgency: 'low',
    },
    {
      id: 2,
      position: [28.6139, 77.2090], // Delhi
      type: 'recipient',
      bloodType: 'Rh-null',
      name: 'Jane Smith',
      urgency: 'high',
    },
    // Add more mock data as needed
  ]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          setZoom(12);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredMarkers = markers.filter((marker) => {
    if (filters.type !== 'all' && marker.type !== filters.type) return false;
    if (filters.bloodType !== 'all' && marker.bloodType !== filters.bloodType) return false;
    if (filters.urgency !== 'all' && marker.urgency !== filters.urgency) return false;
    return true;
  });

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', position: 'relative' }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
          bgcolor: 'white',
          '&:hover': { bgcolor: 'grey.100' },
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <FilterIcon />
      </IconButton>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeView center={center} zoom={zoom} />
        
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={marker.type === 'donor' ? donorIcon : recipientIcon}
          >
            <Popup>
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {marker.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {marker.type === 'donor' ? 'Donor' : 'Recipient'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Blood Type: {marker.bloodType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Urgency: {marker.urgency}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Type
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip
              label="All"
              onClick={() => handleFilterChange('type', 'all')}
              color={filters.type === 'all' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="Donors"
              onClick={() => handleFilterChange('type', 'donor')}
              color={filters.type === 'donor' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="Recipients"
              onClick={() => handleFilterChange('type', 'recipient')}
              color={filters.type === 'recipient' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Blood Type
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip
              label="All"
              onClick={() => handleFilterChange('bloodType', 'all')}
              color={filters.bloodType === 'all' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="Bombay"
              onClick={() => handleFilterChange('bloodType', 'Bombay')}
              color={filters.bloodType === 'Bombay' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="Rh-null"
              onClick={() => handleFilterChange('bloodType', 'Rh-null')}
              color={filters.bloodType === 'Rh-null' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Urgency
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip
              label="All"
              onClick={() => handleFilterChange('urgency', 'all')}
              color={filters.urgency === 'all' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="High"
              onClick={() => handleFilterChange('urgency', 'high')}
              color={filters.urgency === 'high' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="Low"
              onClick={() => handleFilterChange('urgency', 'low')}
              color={filters.urgency === 'low' ? 'primary' : 'default'}
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MapView; 