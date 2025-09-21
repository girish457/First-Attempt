// Auth service for managing user authentication
export class AuthService {
  constructor() {
    this.userKey = 'user';
  }

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userData = localStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  // Login user
  login(email, password) {
    // In a real app, this would make an API call
    // For now, we'll simulate a successful login
    const user = {
      id: 1,
      email: email,
      name: email.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    };
    
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return user;
  }

  // Signup user
  signup(name, email, password) {
    // In a real app, this would make an API call
    // For now, we'll simulate a successful signup
    const user = {
      id: Date.now(), // Simple ID generation
      email: email,
      name: name,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    };
    
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return user;
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.userKey);
  }

  // Check if user is logged in
  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

// Export a singleton instance
export const authService = new AuthService();