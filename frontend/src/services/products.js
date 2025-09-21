// Products service for managing product data
export class ProductService {
  // Get all products
  async getProducts() {
    // In a real app, this would make an API call
    // For now, we'll return sample data
    return [
      {
        id: 1,
        name: "Premium Cotton Blend T-Shirt",
        price: 1599,
        originalPrice: 2499,
        discount: 36,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        category: "ethnic-woman"
      },
      {
        id: 2,
        name: "Elegant Evening Dress",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        rating: 4.8,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        category: "ethnic-woman"
      },
      {
        id: 3,
        name: "Casual Denim Jacket",
        price: 2899,
        originalPrice: 3999,
        discount: 28,
        rating: 4.3,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        category: "child-girl"
      },
      {
        id: 4,
        name: "Summer Floral Maxi Dress",
        price: 3599,
        originalPrice: 4999,
        discount: 28,
        rating: 4.6,
        reviews: 203,
        image: "https://drive.google.com/uc?export=download&id=1tfIpTtBS-WxbEebzv1DdNwDWZL6cIUCg",
        category: "child-girl"
      }
    ];
  }

  // Get product by ID
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === parseInt(id)) || null;
  }
}

// Export a singleton instance
export const productService = new ProductService();