# RarePair - Rare Blood & Organ Donor Matching Platform

RarePair is India's first map-enabled, real-time donor-recipient matching platform for rare blood types and organ transplants. Built with modern web technologies and a focus on user experience.

## Features

- Real-time donor-recipient matching
- Interactive map visualization
- ML-powered organ compatibility prediction
- Secure authentication system
- Mobile-first responsive design
- Privacy-focused architecture

## Tech Stack

- **Frontend**: React.js, Material-UI, Leaflet.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcrypt
- **Maps**: Leaflet.js + OpenStreetMap
- **ML Service**: Python (FastAPI)
- **File Storage**: Cloudinary
- **Email**: Nodemailer + Brevo/SendGrid
- **Deployment**: Render

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/rarepair.git
cd rarepair
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_SERVICE=brevo
EMAIL_USER=your_email
EMAIL_PASS=your_password

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

4. Start development servers
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## Mobile Responsiveness

The application is built with a mobile-first approach, ensuring optimal user experience across all devices.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Helmet security headers
- Input sanitization
- Rate limiting

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenStreetMap for map data
- Material-UI for component library
- Render for hosting 
