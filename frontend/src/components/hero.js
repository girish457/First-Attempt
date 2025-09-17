export class Hero {
  constructor(app) {
    this.app = app;
  }

  render() {
    return `
      <section class="hero">
        <div class="hero-content">
          <h1>Delicious Food Delivered to Your Door</h1>
          <p>Discover amazing dishes from our curated menu and have them delivered fresh to your home</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" data-action="view-menu">
              <i class="fas fa-utensils"></i>
              View Menu
            </button>
            <button class="btn btn-outline" data-action="signup">
              <i class="fas fa-user-plus"></i>
              Get Started
            </button>
          </div>
        </div>
      </section>
    `;
  }

  setupEventListeners() {
    document.querySelectorAll('[data-action="view-menu"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('#products').scrollIntoView({ 
          behavior: 'smooth' 
        });
      });
    });

    document.querySelectorAll('[data-action="signup"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.app.showSignup();
      });
    });
  }
}

