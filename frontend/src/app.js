import { AuthService } from './services/auth.js'
import { ProductService } from './services/products.js'
import { WishlistService } from './services/wishlist.js'
import { CartService } from './services/cart.js'
import { Header } from './components/header.js'
import { Hero } from './components/hero.js'
import { Products } from './components/products.js'
import { AuthModal } from './components/auth-modal.js'
import { UserAccount } from './components/user-account.js'

export class App {
  constructor() {
    this.authService = new AuthService();
    this.productService = new ProductService();
    this.wishlistService = new WishlistService();
    this.cartService = new CartService();
    this.currentUser = null;
    this.products = [];
    this.wishlist = [];
    this.cart = [];
  }

  async init() {
    // Check if user is logged in
    this.currentUser = this.authService.getCurrentUser();
    
    // Render the app
    this.render();
    
    // Load initial data
    await this.loadData();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  render() {
    const app = document.querySelector('#app');
    app.innerHTML = `
      <div class="app">
        <div id="header"></div>
        <div id="main-content"></div>
        <div id="auth-modal"></div>
      </div>
    `;

    // Render components
    this.renderHeader();
    this.renderMainContent();
    this.renderAuthModal();
  }

  renderHeader() {
    const headerContainer = document.querySelector('#header');
    const header = new Header(this);
    headerContainer.innerHTML = header.render();
    header.setupEventListeners();
  }

  renderMainContent() {
    const mainContent = document.querySelector('#main-content');
    
    if (this.currentUser) {
      // Show user account page
      const userAccount = new UserAccount(this);
      mainContent.innerHTML = userAccount.render();
      userAccount.setupEventListeners();
    } else {
      // Show public pages
      mainContent.innerHTML = `
        <div id="hero"></div>
        <div id="products"></div>
      `;
      
      this.renderHero();
      this.renderProducts();
    }
  }

  renderHero() {
    const heroContainer = document.querySelector('#hero');
    const hero = new Hero(this);
    heroContainer.innerHTML = hero.render();
    hero.setupEventListeners();
  }

  renderProducts() {
    const productsContainer = document.querySelector('#products');
    const products = new Products(this);
    productsContainer.innerHTML = products.render();
    products.setupEventListeners();
  }

  renderAuthModal() {
    const modalContainer = document.querySelector('#auth-modal');
    const authModal = new AuthModal(this);
    modalContainer.innerHTML = authModal.render();
    authModal.setupEventListeners();
  }

  async loadData() {
    try {
      // Load products
      this.products = await this.productService.getProducts();
      
      // Load wishlist and cart if user is logged in
      if (this.currentUser) {
        this.wishlist = await this.wishlistService.getWishlist();
        this.cart = await this.cartService.getCart();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  setupEventListeners() {
    // Global event listeners
    document.addEventListener('userLoggedIn', () => {
      this.currentUser = this.authService.getCurrentUser();
      this.render();
      this.loadData();
    });

    document.addEventListener('userLoggedOut', () => {
      this.currentUser = null;
      this.wishlist = [];
      this.render();
      this.loadData();
    });

    document.addEventListener('wishlistUpdated', () => {
      this.loadData();
    });
  }

  // Navigation methods
  showLogin() {
    const modal = document.querySelector('.modal');
    modal.classList.add('active');
    const loginTab = document.querySelector('#login-tab');
    if (loginTab) loginTab.click();
  }

  showSignup() {
    const modal = document.querySelector('.modal');
    modal.classList.add('active');
    const signupTab = document.querySelector('#signup-tab');
    if (signupTab) signupTab.click();
  }

  hideAuthModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('active');
  }

  logout() {
    this.authService.logout();
    document.dispatchEvent(new CustomEvent('userLoggedOut'));
  }

  // Wishlist methods
  async toggleWishlist(productId) {
    if (!this.currentUser) {
      this.showLogin();
      return;
    }

    try {
      const isInWishlist = this.wishlist.some(item => item.id === productId);
      
      if (isInWishlist) {
        await this.wishlistService.removeFromWishlist(productId);
      } else {
        await this.wishlistService.addToWishlist(productId);
      }
      
      document.dispatchEvent(new CustomEvent('wishlistUpdated'));
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  }

  isInWishlist(productId) {
    return this.wishlist.some(item => item.id === productId);
  }
}
