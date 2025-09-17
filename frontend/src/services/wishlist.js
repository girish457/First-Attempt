import { AuthService } from './auth.js';

const API_BASE_URL = 'http://localhost:3001/api';

export class WishlistService {
  constructor() {
    this.authService = new AuthService();
  }

  async getWishlist() {
    if (!this.authService.isAuthenticated()) {
      return [];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        headers: this.authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  }

  async addToWishlist(productId) {
    if (!this.authService.isAuthenticated()) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
        method: 'POST',
        headers: this.authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add to wishlist');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  async removeFromWishlist(productId) {
    if (!this.authService.isAuthenticated()) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: this.authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to remove from wishlist');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }
}

