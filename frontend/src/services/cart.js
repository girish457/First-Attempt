// Cart service for managing cart functionality with localStorage
export class CartService {
  constructor() {
    this.cartKey = 'cart';
  }

  // Get cart items from localStorage
  getCart() {
    try {
      const cartData = localStorage.getItem(this.cartKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  }

  // Add item to cart
  addToCart(product, quantity = 1) {
    try {
      const cart = this.getCart();
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          quantity: quantity
        });
      }

      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.updateCartCount();
      return cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Update cart item quantity
  updateCartItem(productId, quantity) {
    try {
      const cart = this.getCart();
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = quantity;
        }
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.updateCartCount();
      }
      
      return cart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  // Remove item from cart
  removeFromCart(productId) {
    try {
      const cart = this.getCart();
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem(this.cartKey, JSON.stringify(updatedCart));
      this.updateCartCount();
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // Clear entire cart
  clearCart() {
    try {
      localStorage.removeItem(this.cartKey);
      this.updateCartCount();
      return [];
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // Get cart item count
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Update cart count in header with real-time updates
  updateCartCount() {
    const count = this.getCartCount();
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
      element.textContent = count;
      // Add animation when count changes
      element.style.transform = 'scale(1.2)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 200);
    });
    
    // Dispatch custom event for React components to listen
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
  }

  // Check if item is in cart
  isInCart(productId) {
    const cart = this.getCart();
    return cart.some(item => item.id === productId);
  }

  // Get cart total
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

// Export a singleton instance
export const cartService = new CartService();

