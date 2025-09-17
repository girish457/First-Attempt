# Golden Elegance E-Commerce

A modern, elegant e-commerce application with a stunning golden theme, featuring comprehensive product management, user authentication, and responsive design.

## ✨ Features

- **Golden Theme Design**: Luxurious golden color scheme with elegant animations
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Layout**: Optimized for mobile and desktop experiences
- **Product Catalog**: Beautiful product display with hover animations
- **User Authentication**: Secure login and registration system
- **Shopping Cart**: Full cart functionality with persistent storage
- **Admin Dashboard**: Comprehensive admin panel for product management

## API Endpoints

- `GET /api/counter` - Get current counter value
- `POST /api/counter/increment` - Increment counter
- `POST /api/counter/decrement` - Decrement counter  
- `POST /api/counter/reset` - Reset counter to 0
- `GET /api/health` - Health check

## 🚀 Quick Start

### Local Development
```bash
# Install all dependencies
npm run install-all

# Start both backend and frontend
npm run dev
```

### Individual Services

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

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites
1. Enable GitHub Pages in your repository settings
2. Set "Source" to "GitHub Actions" in Pages settings
3. Push your code to the main/master branch

### Deployment Process
1. The GitHub Actions workflow automatically triggers on push to main/master
2. Frontend is built using Vite
3. Static files are deployed to GitHub Pages
4. Your site will be available at: `https://yourusername.github.io/your-repo-name/`

### Manual Deployment Setup
If you need to set up deployment manually:

1. **Repository Settings**:
   - Go to Settings → Pages
   - Source: "Deploy from a branch" or "GitHub Actions" (recommended)
   - Branch: main/master

2. **Local Build** (if needed):
   ```bash
   cd frontend
   npm run build
   # The dist/ folder contains deployable files
   ```

## 🎯 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3001/admin

### Admin Credentials
- **Email**: `admin@foodiehub.com`
- **Password**: `admin123`

## 🎆 Key Features

### Frontend
- ✨ **Golden Theme**: Luxurious golden color palette with smooth animations
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Optimized for all device sizes
- 🛍️ **Product Catalog**: Interactive product displays with hover effects
- 👤 **User Authentication**: Secure login and registration
- 🛍️ **Shopping Cart**: Persistent cart functionality
- ❤️ **Wishlist**: Save favorite products

### Backend
- 🚀 **Express.js API**: RESTful API endpoints
- 🔐 **JWT Authentication**: Secure user sessions
- 📋 **Data Persistence**: JSON-based data storage
- 🌐 **CORS Enabled**: Cross-origin request support
- 📉 **Admin Dashboard**: Comprehensive management interface

### Admin Dashboard
- 👥 **User Management**: View and manage users
- 📊 **Product Analytics**: Sales and inventory insights
- 📈 **Real-time Statistics**: Live data visualization
- ❤️ **Wishlist Monitoring**: Track user preferences
- 📊 **Data Charts**: Interactive analytics

## 🛠️ Technology Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Authentication**: JWT
- **Styling**: Tailwind CSS with custom golden theme
- **Build Tool**: Vite
- **Deployment**: GitHub Pages + GitHub Actions

## 👾 Troubleshooting

### Common Issues

1. **Port Conflicts**: If ports 3001 or 5173 are in use, update the port in the respective config files
2. **CORS Errors**: Ensure backend is running before starting frontend
3. **Build Errors**: Clear node_modules and reinstall dependencies
4. **Dark Mode Not Working**: Clear browser localStorage and refresh

### GitHub Pages Deployment Issues

1. **Jekyll Processing Error**: This project includes `.nojekyll` file to disable Jekyll
2. **404 Errors**: Ensure base path in vite.config.js matches your repository name
3. **GitHub Actions Failure**: Check that Pages is enabled in repository settings

## 🔗 Live Demo

Once deployed, your application will be available at:
`https://yourusername.github.io/your-repo-name/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
