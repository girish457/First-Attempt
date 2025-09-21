// Wishlist service for managing wishlist functionality with localStorage
export class WishlistService {
  constructor() {
    this.wishlistKey = 'wishlist';
  }

  // Get wishlist items from localStorage
  async getWishlist() {
    try {
      const wishlistData = localStorage.getItem(this.wishlistKey);
      const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
      return wishlist;
    } catch (error) {
      console.error('Error getting wishlist:', error);
      return [];
    }
  }

  // Add item to wishlist
  async addToWishlist(productId) {
    try {
      const wishlist = await this.getWishlist();
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
      }
      return wishlist;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  // Remove item from wishlist
  async removeFromWishlist(productId) {
    try {
      const wishlist = await this.getWishlist();
      const updatedWishlist = wishlist.filter(id => id !== productId);
      localStorage.setItem(this.wishlistKey, JSON.stringify(updatedWishlist));
      return updatedWishlist;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  // Check if item is in wishlist
  async isInWishlist(productId) {
    const wishlist = await this.getWishlist();
    return wishlist.includes(productId);
  }
}

// Export a singleton instance
export const wishlistService = new WishlistService();