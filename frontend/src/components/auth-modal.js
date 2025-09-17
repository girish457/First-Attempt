export class AuthModal {
  constructor(app) {
    this.app = app;
    this.currentTab = 'login';
  }

  render() {
    return `
      <div class="modal" id="auth-modal">
        <div class="modal-content">
          <button class="modal-close" data-action="close">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="auth-tabs">
            <button class="tab-btn active" id="login-tab" data-tab="login">Login</button>
            <button class="tab-btn" id="signup-tab" data-tab="signup">Sign Up</button>
          </div>
          
          <div class="tab-content active" id="login-content">
            <h2>Welcome Back</h2>
            <form id="login-form">
              <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" name="email" required>
              </div>
              <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" name="password" required>
              </div>
              <button type="submit" class="form-submit">Login</button>
            </form>
            <div class="form-switch">
              Don't have an account? <a href="#" data-action="switch-to-signup">Sign up here</a>
            </div>
          </div>
          
          <div class="tab-content" id="signup-content">
            <h2>Create Account</h2>
            <form id="signup-form">
              <div class="form-group">
                <label for="signup-name">Full Name</label>
                <input type="text" id="signup-name" name="name" required>
              </div>
              <div class="form-group">
                <label for="signup-email">Email</label>
                <input type="email" id="signup-email" name="email" required>
              </div>
              <div class="form-group">
                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" name="password" required minlength="6">
              </div>
              <button type="submit" class="form-submit">Sign Up</button>
            </form>
            <div class="form-switch">
              Already have an account? <a href="#" data-action="switch-to-login">Login here</a>
            </div>
          </div>
          
          <div id="auth-message" class="error hidden"></div>
        </div>
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

    // Switch tab links
    document.querySelectorAll('[data-action="switch-to-signup"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchTab('signup');
      });
    });

    document.querySelectorAll('[data-action="switch-to-login"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchTab('login');
      });
    });

    // Close modal
    document.querySelectorAll('[data-action="close"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.app.hideAuthModal();
      });
    });

    // Click outside to close
    document.querySelector('.modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.app.hideAuthModal();
      }
    });

    // Form submissions
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin(e);
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignup(e);
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
    this.hideMessage();
  }

  async handleLogin(e) {
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      this.showMessage('Logging in...', 'loading');
      await this.app.authService.login(email, password);
      this.hideMessage();
      this.app.hideAuthModal();
      document.dispatchEvent(new CustomEvent('userLoggedIn'));
    } catch (error) {
      this.showMessage(error.message, 'error');
    }
  }

  async handleSignup(e) {
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      this.showMessage('Creating account...', 'loading');
      await this.app.authService.register(name, email, password);
      this.hideMessage();
      this.app.hideAuthModal();
      document.dispatchEvent(new CustomEvent('userLoggedIn'));
    } catch (error) {
      this.showMessage(error.message, 'error');
    }
  }

  showMessage(message, type = 'error') {
    const messageEl = document.getElementById('auth-message');
    messageEl.textContent = message;
    messageEl.className = type === 'loading' ? 'loading' : 'error';
    messageEl.classList.remove('hidden');
  }

  hideMessage() {
    const messageEl = document.getElementById('auth-message');
    messageEl.classList.add('hidden');
  }
}

