# User Authentication System - Testing Instructions

## Overview
Your e-commerce website now has a complete user authentication system with:
- User registration with email, name, and mobile number
- User login with email and password
- User data storage in backend JSON files
- Admin dashboard to view user details

## How to Test the System

### 1. Start the Application

**Backend (Terminal 1):**
```bash
cd backend
npm install
npm run dev
```
The backend will run on http://localhost:3001

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on http://localhost:5173

### 2. Test User Registration & Login

1. **Go to the website**: http://localhost:5173
2. **Click on the "Account" icon** (👤) in the top-right corner
3. **Create a new account**:
   - Click "Sign Up" if you're on the login form
   - Fill in:
     - Full Name: `John Doe`
     - Email: `john@example.com`
     - Mobile: `9876543210`
     - Password: `password123`
     - Confirm Password: `password123`
   - Click "Create Account"
4. **User will be automatically logged in** and see their account dashboard
5. **Test Logout**: Click the "Logout" button
6. **Test Login**: Try logging in again with the same email and password

### 3. View Users in Admin Dashboard

1. **Open Admin Dashboard**: http://localhost:3001/admin
2. **Login as Admin**:
   - Email: `admin@foodiehub.com`
   - Password: `admin123`
3. **Go to Users Tab**: Click on "Users" in the sidebar
4. **You should see**:
   - All registered users (including the one you just created)
   - User details: Name, Email, Mobile Number, Join Date
   - Delete button for each user

### 4. Test User Security

1. **Try to login with wrong credentials** - should show error
2. **Try to access account without being logged in** - should show login form
3. **Only users who registered can login** - no random access allowed

## Features Implemented

### Frontend (AccountPage.jsx)
- ✅ Beautiful login/signup form with validation
- ✅ User dashboard showing account information
- ✅ Form validation for email, mobile number, password
- ✅ Mobile number field (10-digit validation)
- ✅ Password visibility toggle
- ✅ Loading states and error handling
- ✅ Responsive design

### Backend (index.js)
- ✅ User registration endpoint with mobile number support
- ✅ User login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ User data storage in JSON files
- ✅ Admin endpoints to view and manage users

### Admin Dashboard (admin.html)
- ✅ User management table with mobile numbers
- ✅ User details display (Name, Email, Mobile, Join Date)
- ✅ Delete user functionality
- ✅ Statistics showing total users

## File Structure

```
frontend/
├── src/
│   ├── ui/pages/
│   │   └── AccountPage.jsx      # Main account page with login/signup
│   ├── services/
│   │   └── auth.js              # Authentication service
│   └── main.jsx                 # Updated with account route

backend/
├── data/
│   └── users.json               # User data storage
├── public/
│   └── admin.html               # Admin dashboard (updated)
└── index.js                     # Backend API (updated)
```

## Test Scenarios

### Valid Registration:
- Name: Any text
- Email: Valid email format
- Mobile: 10-digit number
- Password: At least 6 characters

### Invalid Cases (should show errors):
- Empty required fields
- Invalid email format
- Mobile number not 10 digits
- Password too short
- Passwords don't match
- Email already exists

## Admin Access
- URL: http://localhost:3001/admin
- Email: admin@foodiehub.com
- Password: admin123

Your user authentication system is now complete and ready for testing!