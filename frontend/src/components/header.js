export class Header {
  constructor(app) {
    this.app = app;
  }

  render() {
    const isLoggedIn = this.app.currentUser;
    
    return `
      <header class="header">
        <div class="header-content">
          <a href="#" class="logo">
            <i class="fas fa-utensils"></i>
            FoodieHub
          </a>
          
          <nav class="nav">
            <ul class="nav-links">
              <li><a href="#" data-page="home">Home</a></li>
              <li><a href="#" data-page="menu">Menu</a></li>
              <li><a href="#" data-page="about">About</a></li>
              <li><a href="#" data-page="contact">Contact</a></li>
            </ul>
            
            <div class="auth-buttons">
              ${isLoggedIn ? this.renderUserMenu() : this.renderAuthButtons()}
            </div>
          </nav>
          
          <button class="mobile-menu-btn">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </header>
    `;
  }

  renderUserMenu() {
    return `
      <div class="user-menu">
        <span class="user-name">Hello, ${this.app.currentUser.name}</span>
        <a href="#" class="btn btn-outline" data-action="account">My Account</a>
        <button class="btn btn-outline" data-action="logout">Logout</button>
      </div>
    `;
  }

  renderAuthButtons() {
    return `
      <button class="btn btn-outline" data-action="login">Login</button>
      <button class="btn btn-primary" data-action="signup">Sign Up</button>
    `;
  }

  setupEventListeners() {
    // Auth buttons
    document.querySelectorAll('[data-action="login"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.app.showLogin();
      });
    });

    document.querySelectorAll('[data-action="signup"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.app.showSignup();
      });
    });

    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.app.logout();
      });
    });

    document.querySelectorAll('[data-action="account"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Already on account page when logged in
      });
    });

    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('active');
      });
    }
  }
}

