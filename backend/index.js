const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const dataStorage = require('./data-storage');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'], // Allow both frontend and admin
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;
    
    // Get users from storage
    const users = await dataStorage.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      mobile: mobile || '', // Store mobile number
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    await dataStorage.addUser(user);
    
    // Initialize wishlist for new user
    const wishlists = await dataStorage.getWishlists();
    wishlists[user.id] = [];
    await dataStorage.saveWishlists(wishlists);
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name, mobile: user.mobile, role: user.role }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    // Get users from storage
    const users = await dataStorage.getUsers();
    console.log('Total users in database:', users.length);
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('User found:', user.email, 'Role:', user.role);
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);
    
    if (!validPassword) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    console.log('Login successful for user:', email);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await dataStorage.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await dataStorage.getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Wishlist Routes
app.get('/api/wishlist', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const wishlists = await dataStorage.getWishlists();
    const products = await dataStorage.getProducts();
    const userWishlist = wishlists[userId] || [];
    const wishlistProducts = userWishlist.map(productId => 
      products.find(p => p.id === productId)
    ).filter(Boolean);
    res.json(wishlistProducts);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = parseInt(req.params.productId);
    const products = await dataStorage.getProducts();
    
    if (!products.find(p => p.id === productId)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const wishlists = await dataStorage.getWishlists();
    if (!wishlists[userId]) {
      wishlists[userId] = [];
    }
    
    if (!wishlists[userId].includes(productId)) {
      wishlists[userId].push(productId);
      await dataStorage.saveWishlists(wishlists);
    }
    
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = parseInt(req.params.productId);
    const wishlists = await dataStorage.getWishlists();
    
    if (wishlists[userId]) {
      wishlists[userId] = wishlists[userId].filter(id => id !== productId);
      await dataStorage.saveWishlists(wishlists);
    }
    
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cart Routes
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await dataStorage.getCart(userId);
    const products = await dataStorage.getProducts();
    
    const cartItems = cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    }).filter(Boolean);
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/cart/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = parseInt(req.params.productId);
    const quantity = req.body.quantity || 1;
    
    const products = await dataStorage.getProducts();
    if (!products.find(p => p.id === productId)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await dataStorage.addToCart(userId, productId, quantity);
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/cart/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = parseInt(req.params.productId);
    const quantity = req.body.quantity;
    
    await dataStorage.updateCartItem(userId, productId, quantity);
    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = parseInt(req.params.productId);
    
    await dataStorage.removeFromCart(userId, productId);
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await dataStorage.clearCart(userId);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const users = await dataStorage.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Legacy counter routes (keeping for compatibility)
app.get('/api/counter', (req, res) => {
  res.json({ counter: 0 });
});

app.post('/api/counter/increment', (req, res) => {
  res.json({ counter: 1 });
});

app.post('/api/counter/decrement', (req, res) => {
  res.json({ counter: -1 });
});

app.post('/api/counter/reset', (req, res) => {
  res.json({ counter: 0 });
});

// Admin Routes
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    
    const stats = await dataStorage.getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    
    const users = await dataStorage.getUsers();
    const regularUsers = users.filter(u => u.role !== 'admin');
    res.json(regularUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/users/:userId', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    
    const userId = parseInt(req.params.userId);
    await dataStorage.deleteUser(userId);
    
    // Also remove user's wishlist
    const wishlists = await dataStorage.getWishlists();
    delete wishlists[userId];
    await dataStorage.saveWishlists(wishlists);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Admin dashboard available at http://localhost:${PORT}/admin`);
  console.log(`Admin credentials: admin@foodiehub.com / admin123`);
});
