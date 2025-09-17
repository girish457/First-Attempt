const API_BASE_URL = 'http://localhost:3001/api';

export class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('authToken', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      return data;
    } catch (error) {
      throw error;
    }
  }

  async register(name, email, password, mobile) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user data
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('authToken', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      return data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
}

