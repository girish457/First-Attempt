import React, { useState, useEffect } from 'react';
import { AuthService } from '../../services/auth.js';

const AccountPage = () => {
  // Updated with admin login functionality - separate login flow
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const authService = new AuthService();

  useEffect(() => {
    // Check if user is already authenticated
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!isLogin && !formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!isLogin && !/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let result;
      if (isLogin) {
        result = await authService.login(formData.email, formData.password);
      } else {
        // For registration, pass mobile number separately
        result = await authService.register(
          formData.name,
          formData.email, 
          formData.password,
          formData.mobile
        );
      }

      setIsAuthenticated(true);
      setUser(result.user);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
      });
      
      // Show success message
      alert(isLogin ? 'Login successful!' : 'Registration successful!');
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleAdminLogin = () => {
    // Open admin login page in new tab
    window.open('http://localhost:3001/admin-login', '_blank');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
  };

  // If user is authenticated, show account dashboard
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section with Glossy Golden Theme */}
        <section className="bg-glossy-gold text-white py-16 relative overflow-hidden">
          <div className="container-responsive text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
              Welcome, <span className="text-golden-200 drop-shadow-lg">{user.name}</span>!
            </h1>
            <p className="text-xl">Manage your account and orders</p>
          </div>
        </section>

        {/* Account Dashboard */}
        <section className="py-20">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Account Info Card with Golden Enhancement */}
                <div className="bg-white rounded-3xl p-8 shadow-glossy border-2 border-golden-200 hover:border-golden-300 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-glossy-gold rounded-2xl flex items-center justify-center text-2xl text-white mr-4 shadow-glossy">
                      👤
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
                      <p className="text-gray-600">Manage your personal details</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">{user.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">{user.email}</div>
                    </div>
                    {user.mobile && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
                        <div className="bg-gray-50 px-4 py-3 rounded-lg">{user.mobile}</div>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Account ID</label>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">#{user.id}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card with Golden Enhancement */}
                <div className="bg-white rounded-3xl p-8 shadow-glossy border-2 border-golden-200 hover:border-golden-300 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-glossy-gold rounded-2xl flex items-center justify-center text-2xl text-white mr-4 shadow-glossy">
                      ⚡
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                      <p className="text-gray-600">Manage your account</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-glossy-gold text-white py-3 px-6 rounded-xl font-semibold hover:bg-golden-400 transition-all duration-300 transform hover:scale-105 shadow-glossy">
                      View Orders
                    </button>
                    <button 
                      onClick={toggleWishlistView}
                      className="w-full bg-golden-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-golden-700 transition-all duration-300 transform hover:scale-105 shadow-glossy flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      View Wishlist
                    </button>
                    <button className="w-full bg-golden-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-golden-600 transition-all duration-300 transform hover:scale-105 shadow-glossy">
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </div>

              </div>

              {/* Recent Activity with Golden Enhancement */}
              <div className="mt-12 bg-white rounded-3xl p-8 shadow-glossy border-2 border-golden-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📦</div>
                  <p>No recent orders or activity to display.</p>
                  <button className="mt-4 bg-glossy-gold text-white py-2 px-6 rounded-full font-semibold hover:bg-golden-400 transition-all duration-300 shadow-glossy">
                    Start Shopping
                  </button>
                </div>
              </div>
              
              {/* Wishlist Section */}
              {showWishlist && (
                <div className="mt-12 bg-white rounded-3xl p-8 shadow-glossy border-2 border-golden-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
                    <button 
                      onClick={toggleWishlistView}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {wishlistLoading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-golden-500"></div>
                      <p className="mt-4 text-gray-600">Loading wishlist...</p>
                    </div>
                  ) : wishlistItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-4">🤍</div>
                      <p>Your wishlist is empty</p>
                      <button 
                        onClick={toggleWishlistView}
                        className="mt-4 bg-glossy-gold text-white py-2 px-6 rounded-full font-semibold hover:bg-golden-400 transition-all duration-300 shadow-glossy"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <div className="relative">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 hidden">
                              <span className="text-gray-500">No Image</span>
                            </div>
                            <button 
                              onClick={() => removeFromWishlist(product.id)}
                              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-golden-600">₹{product.price.toLocaleString('en-IN')}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Login/Signup form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Glossy Golden Theme */}
      <section className="bg-glossy-gold text-white py-16 relative overflow-hidden">
        <div className="container-responsive text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
            My <span className="text-golden-200 drop-shadow-lg">Account</span>
          </h1>
          <p className="text-xl">
            {isLogin ? 'Welcome back! Please sign in to your account.' : 'Join our community and start shopping!'}
          </p>
        </div>
      </section>

      {/* Auth Form Section */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-glossy border-2 border-golden-200">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-glossy-gold rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-4 shadow-glossy">
                  👤
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to your account' : 'Join our ethnic wear community'}
                </p>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {errors.submit}
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-400' : 'border-golden-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-400' : 'border-golden-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Mobile Field (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-transparent transition-all duration-200 ${
                        errors.mobile ? 'border-red-400' : 'border-golden-300'
                      }`}
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-transparent transition-all duration-200 pr-12 ${
                        errors.password ? 'border-red-400' : 'border-golden-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password Field (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-400' : 'border-golden-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-glossy-gold text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-golden-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-glossy"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </span>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>

              </form>

              {/* Admin Login Button (only show in login mode) */}
              {isLogin && (
                <div className="mt-6">
                  <button
                    onClick={handleAdminLogin}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-user-shield text-lg"></i>
                    Login as Admin
                  </button>
                </div>
              )}

              {/* Toggle Auth Mode */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={toggleAuthMode}
                    className="ml-2 text-glossy-gold bg-glossy-gold bg-clip-text text-transparent font-semibold hover:text-golden-600 transition-colors"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;