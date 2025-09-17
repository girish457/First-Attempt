# Full-Stack Application

This is a simple full-stack application with an Express.js backend and Vite frontend.

## Features

- **Backend**: Express.js server with REST API endpoints
- **Frontend**: Vite-based React-like vanilla JavaScript app
- **Counter**: Interactive counter that persists data on the backend
- **CORS**: Properly configured for cross-origin requests

## API Endpoints

- `GET /api/counter` - Get current counter value
- `POST /api/counter/increment` - Increment counter
- `POST /api/counter/decrement` - Decrement counter  
- `POST /api/counter/reset` - Reset counter to 0
- `GET /api/health` - Health check

## Getting Started

### Quick Start (Recommended)
```bash
# Install all dependencies
npm run install-all

# Start both backend and frontend with one command
npm run dev
```

### Alternative: Run separately

**Backend only:**
```bash
npm run backend
```

**Frontend only:**
```bash
npm run frontend
```

### Manual Setup

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3001/admin

### Admin Credentials
- **Email**: `admin@foodiehub.com`
- **Password**: `admin123`

## Features

### Frontend
- Beautiful food product catalog
- User authentication (login/signup)
- Wishlist functionality
- Responsive design (mobile & desktop)
- Real-time data from backend

### Backend
- Express.js REST API
- JWT authentication
- Persistent data storage (JSON files)
- CORS enabled
- Admin dashboard

### Admin Dashboard
- User management
- Product analytics
- Real-time statistics
- Wishlist monitoring
- Data visualization
