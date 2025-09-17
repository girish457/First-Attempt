const API_BASE_URL = 'http://localhost:3001/api';

export class ProductService {
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
}

