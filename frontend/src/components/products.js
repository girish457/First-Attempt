import { CartService } from '../services/cart.js';

export class Products {
  constructor(app) {
    this.app = app;
    this.cartService = new CartService();
  }

  render() {
    if (this.app.products.length === 0) {
      return `
        <section class="products-section">
          <div class="container">
            <div class="loading">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Loading delicious food...</p>
            </div>
          </div>
        </section>
      `;
    }

    return `
      <section class="products-section">
        <div class="container">
          <div class="section-title">
            <h2>Our Menu</h2>
            <p>Fresh ingredients, amazing flavors, delivered to your door</p>
          </div>
          
          <div class="products-grid">
            ${this.app.products.map(product => this.renderProductCard(product)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderProductCard(product) {
    const isInWishlist = this.app.isInWishlist(product.id);
    
    return `
      <div class="product-card fade-in">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price}</span>
            <div class="product-actions">
              <button class="cart-btn" 
                      data-product-id="${product.id}"
                      title="Add to cart">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                      data-product-id="${product.id}"
                      title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Cart buttons
    document.querySelectorAll('.cart-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const productId = parseInt(btn.dataset.productId);
        await this.addToCart(productId);
      });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(btn.dataset.productId);
        this.app.toggleWishlist(productId);
      });
    });

    // Listen for wishlist updates
    document.addEventListener('wishlistUpdated', () => {
      this.updateWishlistButtons();
    });
  }

  async addToCart(productId) {
    if (!this.app.currentUser) {
      this.app.showLogin();
      return;
    }

    try {
      await this.cartService.addToCart(productId);
      
      // Show success message
      this.showMessage('Product added to cart!', 'success');
      
      // Dispatch cart updated event
      document.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showMessage('Failed to add to cart', 'error');
    }
  }

  showMessage(message, type = 'success') {
    // Create or update message element
    let messageEl = document.querySelector('.product-message');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'product-message';
      document.querySelector('.products-section').prepend(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `product-message ${type}`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (messageEl) {
        messageEl.remove();
      }
    }, 3000);
  }

  updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const productId = parseInt(btn.dataset.productId);
      const isInWishlist = this.app.isInWishlist(productId);
      
      btn.classList.toggle('active', isInWishlist);
      btn.title = isInWishlist ? 'Remove from wishlist' : 'Add to wishlist';
    });
  }
}
