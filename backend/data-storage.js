const fs = require('fs-extra');
const path = require('path');

class DataStorage {
  constructor() {
    this.dataDir = path.join(__dirname, 'data');
    this.usersFile = path.join(this.dataDir, 'users.json');
    this.productsFile = path.join(this.dataDir, 'products.json');
    this.wishlistsFile = path.join(this.dataDir, 'wishlists.json');
    this.cartsFile = path.join(this.dataDir, 'carts.json');
    this.init();
  }

  async init() {
    // Create data directory if it doesn't exist
    await fs.ensureDir(this.dataDir);
    
    // Initialize files with default data if they don't exist
    await this.initializeFiles();
  }

  async initializeFiles() {
    // Initialize users file
    if (!await fs.pathExists(this.usersFile)) {
      const defaultUsers = [
        {
          id: 1,
          email: 'admin@foodiehub.com',
          password: '$2a$10$H0yt7E1QVuikXgjyh6doReg8O62MhrHY1QQ7oZbMPB3MGCZ8zACfC', // password: 'admin123'
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ];
      await fs.writeJson(this.usersFile, defaultUsers);
    }

    // Initialize products file
    if (!await fs.pathExists(this.productsFile)) {
      const defaultProducts = [
        {
          id: 1,
          name: "Margherita Pizza",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
          description: "Classic tomato, mozzarella, and basil pizza",
          category: "Pizza"
        },
        {
          id: 2,
          name: "Chicken Burger",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
          description: "Juicy chicken breast with lettuce, tomato, and mayo",
          category: "Burgers"
        },
        {
          id: 3,
          name: "Caesar Salad",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
          description: "Fresh romaine lettuce with parmesan and croutons",
          category: "Salads"
        },
        {
          id: 4,
          name: "Pasta Carbonara",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
          description: "Creamy pasta with bacon, eggs, and parmesan",
          category: "Pasta"
        },
        {
          id: 5,
          name: "Fish & Chips",
          price: 11.99,
          image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400",
          description: "Crispy battered fish with golden fries",
          category: "Seafood"
        },
        {
          id: 6,
          name: "Chocolate Cake",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
          description: "Rich chocolate cake with chocolate frosting",
          category: "Desserts"
        },
        {
          id: 7,
          name: "BBQ Ribs",
          price: 16.99,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
          description: "Slow-cooked ribs with BBQ sauce and coleslaw",
          category: "BBQ"
        },
        {
          id: 8,
          name: "Sushi Platter",
          price: 18.99,
          image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd1871?w=400",
          description: "Fresh salmon, tuna, and California rolls",
          category: "Sushi"
        },
        {
          id: 9,
          name: "Chicken Wings",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
          description: "Crispy wings with buffalo sauce and ranch",
          category: "Appetizers"
        },
        {
          id: 10,
          name: "Beef Steak",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
          description: "Grilled ribeye steak with mashed potatoes",
          category: "Steak"
        },
        {
          id: 11,
          name: "Tacos",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
          description: "Three soft tacos with your choice of filling",
          category: "Mexican"
        },
        {
          id: 12,
          name: "Ice Cream Sundae",
          price: 5.99,
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
          description: "Vanilla ice cream with chocolate sauce and nuts",
          category: "Desserts"
        }
      ];
      await fs.writeJson(this.productsFile, defaultProducts);
    }

    // Initialize wishlists file
    if (!await fs.pathExists(this.wishlistsFile)) {
      await fs.writeJson(this.wishlistsFile, {});
    }

    // Initialize carts file
    if (!await fs.pathExists(this.cartsFile)) {
      await fs.writeJson(this.cartsFile, {});
    }
  }

  // Users methods
  async getUsers() {
    return await fs.readJson(this.usersFile);
  }

  async saveUsers(users) {
    await fs.writeJson(this.usersFile, users);
  }

  async addUser(user) {
    const users = await this.getUsers();
    users.push(user);
    await this.saveUsers(users);
    return user;
  }

  async updateUser(userId, updates) {
    const users = await this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      await this.saveUsers(users);
      return users[userIndex];
    }
    return null;
  }

  async deleteUser(userId) {
    const users = await this.getUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    await this.saveUsers(filteredUsers);
  }

  // Products methods
  async getProducts() {
    return await fs.readJson(this.productsFile);
  }

  async saveProducts(products) {
    await fs.writeJson(this.productsFile, products);
  }

  // Wishlists methods
  async getWishlists() {
    return await fs.readJson(this.wishlistsFile);
  }

  async saveWishlists(wishlists) {
    await fs.writeJson(this.wishlistsFile, wishlists);
  }

  async updateWishlist(userId, productIds) {
    const wishlists = await this.getWishlists();
    wishlists[userId] = productIds;
    await this.saveWishlists(wishlists);
  }

  // Cart methods
  async getCarts() {
    return await fs.readJson(this.cartsFile);
  }

  async saveCarts(carts) {
    await fs.writeJson(this.cartsFile, carts);
  }

  async getCart(userId) {
    const carts = await this.getCarts();
    return carts[userId] || [];
  }

  async addToCart(userId, productId, quantity = 1) {
    const carts = await this.getCarts();
    if (!carts[userId]) {
      carts[userId] = [];
    }
    
    const existingItem = carts[userId].find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[userId].push({ productId, quantity });
    }
    
    await this.saveCarts(carts);
  }

  async removeFromCart(userId, productId) {
    const carts = await this.getCarts();
    if (carts[userId]) {
      carts[userId] = carts[userId].filter(item => item.productId !== productId);
      await this.saveCarts(carts);
    }
  }

  async updateCartItem(userId, productId, quantity) {
    const carts = await this.getCarts();
    if (carts[userId]) {
      const item = carts[userId].find(item => item.productId === productId);
      if (item) {
        if (quantity <= 0) {
          await this.removeFromCart(userId, productId);
        } else {
          item.quantity = quantity;
          await this.saveCarts(carts);
        }
      }
    }
  }

  async clearCart(userId) {
    const carts = await this.getCarts();
    carts[userId] = [];
    await this.saveCarts(carts);
  }

  // Admin methods
  async getAdminStats() {
    const users = await this.getUsers();
    const products = await this.getProducts();
    const wishlists = await this.getWishlists();
    
    const regularUsers = users.filter(u => u.role !== 'admin');
    const totalWishlistItems = Object.values(wishlists).reduce((sum, items) => sum + items.length, 0);
    
    return {
      totalUsers: regularUsers.length,
      totalProducts: products.length,
      totalWishlistItems,
      recentUsers: regularUsers.slice(-5).reverse(),
      popularProducts: this.getPopularProducts(products, wishlists)
    };
  }

  getPopularProducts(products, wishlists) {
    const productCounts = {};
    Object.values(wishlists).forEach(items => {
      items.forEach(productId => {
        productCounts[productId] = (productCounts[productId] || 0) + 1;
      });
    });

    return products
      .map(product => ({
        ...product,
        wishlistCount: productCounts[product.id] || 0
      }))
      .sort((a, b) => b.wishlistCount - a.wishlistCount)
      .slice(0, 5);
  }
}

module.exports = new DataStorage();
