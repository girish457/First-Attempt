import { CartService } from '../services/cart.js';

export class UserAccount {
  constructor(app) {
    this.app = app;
    this.currentTab = 'profile';
    this.cartService = new CartService();
    this.cart = [];
  }

  render() {
    return `
      <div class="user-account">
        <div class="container">
          <div class="account-header">
            <h1>My Account</h1>
            <p>Welcome back, ${this.app.currentUser.name}!</p>
          </div>
          
          <div class="account-tabs">
            <button class="tab-btn active" data-tab="profile">Profile</button>
            <button class="tab-btn" data-tab="cart">Cart (${this.cart.length})</button>
            <button class="tab-btn" data-tab="wishlist">Wishlist (${this.app.wishlist.length})</button>
          </div>
          
          <div class="tab-content active" id="profile-content">
            <div class="profile-info">
              <h3>Profile Information</h3>
              <div class="profile-details">
                <p><strong>Name:</strong> ${this.app.currentUser.name}</p>
                <p><strong>Email:</strong> ${this.app.currentUser.email}</p>
                <p><strong>Member since:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div class="tab-content" id="cart-content">
            ${this.renderCart()}
          </div>
          
          <div class="tab-content" id="wishlist-content">
            ${this.renderWishlist()}
          </div>
        </div>
      </div>
    `;
  }

  renderCart() {
    if (this.cart.length === 0) {
      return `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
          <h3>Your cart is empty</h3>
          <p>Start adding delicious food to your cart!</p>
          <button class="btn btn-primary" onclick="window.location.reload()">
            <i class="fas fa-utensils"></i>
            Browse Menu
          </button>
        </div>
      `;
    }

    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return `
      <div class="cart-section">
        <h3>Your Cart (${this.cart.length} items)</h3>
        <div class="cart-grid">
          ${this.cart.map(item => this.renderCartItem(item)).join('')}
        </div>
        <div class="cart-total">
          <h4>Total: $${total.toFixed(2)}</h4>
          <button class="btn btn-primary" onclick="alert('Checkout functionality coming soon!')">
            <i class="fas fa-credit-card"></i>
            Checkout
          </button>
        </div>
      </div>
    `;
  }

  renderCartItem(item) {
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-image">
        <div class="cart-info">
          <div class="cart-name">${item.name}</div>
          <div class="cart-price">$${item.price} x ${item.quantity}</div>
        </div>
        <div class="cart-controls">
          <button class="quantity-btn" onclick="this.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="this.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          <button class="remove-cart" data-product-id="${item.id}" title="Remove from cart">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderWishlist() {
    if (this.app.wishlist.length === 0) {
      return `
        <div class="empty-wishlist">
          <i class="fas fa-heart" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you love to your wishlist!</p>
          <button class="btn btn-primary" onclick="window.location.reload()">
            <i class="fas fa-utensils"></i>
            Browse Menu
          </button>
        </div>
      `;
    }

    return `
      <div class="wishlist-section">
        <h3>Your Wishlist (${this.app.wishlist.length} items)</h3>
        <div class="wishlist-grid">
          ${this.app.wishlist.map(item => this.renderWishlistItem(item)).join('')}
        </div>
      </div>
    `;
  }

  renderWishlistItem(item) {
    return `
      <div class="wishlist-item">
        <img src="${item.image}" alt="${item.name}" class="wishlist-image">
        <div class="wishlist-info">
          <div class="wishlist-name">${item.name}</div>
          <div class="wishlist-price">$${item.price}</div>
        </div>
        <button class="remove-wishlist" data-product-id="${item.id}" title="Remove from wishlist">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchTab(btn.dataset.tab);
      });
    });

    // Remove from cart buttons
    document.querySelectorAll('.remove-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(btn.dataset.productId);
        this.removeFromCart(productId);
      });
    });

    // Remove from wishlist buttons
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(btn.dataset.productId);
        this.app.toggleWishlist(productId);
      });
    });

    // Listen for updates
    document.addEventListener('wishlistUpdated', () => {
      this.updateWishlistTab();
      this.updateWishlistContent();
    });

    document.addEventListener('cartUpdated', () => {
      this.loadCart();
    });
  }

  switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tab}-content`);
    });

    this.currentTab = tab;
  }

  updateWishlistTab() {
    const wishlistTab = document.querySelector('[data-tab="wishlist"]');
    if (wishlistTab) {
      wishlistTab.textContent = `Wishlist (${this.app.wishlist.length})`;
    }
  }

  updateWishlistContent() {
    const wishlistContent = document.getElementById('wishlist-content');
    if (wishlistContent) {
      wishlistContent.innerHTML = this.renderWishlist();
      this.setupEventListeners(); // Re-setup event listeners for new content
    }
  }

  async loadCart() {
    try {
      this.cart = await this.cartService.getCart();
      this.updateCartTab();
      this.updateCartContent();
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  async removeFromCart(productId) {
    try {
      await this.cartService.removeFromCart(productId);
      this.loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  updateCartTab() {
    const cartTab = document.querySelector('[data-tab="cart"]');
    if (cartTab) {
      cartTab.textContent = `Cart (${this.cart.length})`;
    }
  }

  updateCartContent() {
    const cartContent = document.getElementById('cart-content');
    if (cartContent) {
      cartContent.innerHTML = this.renderCart();
      this.setupEventListeners(); // Re-setup event listeners for new content
    }
  }
}
