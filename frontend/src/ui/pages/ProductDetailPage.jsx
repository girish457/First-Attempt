import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { cartService } from '../../services/cart.js';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
  // Add state for image error handling
  const [imageError, setImageError] = useState({});

  // Enhanced product data with more details for product page
  const enhancedProducts = {
    1: {
      brand: "METRONAUT",
      title: "Men Regular Fit Solid Spread Collar Casual Shirt",
      images: [],
      colors: [
        { name: 'Green', value: '#10B981', image: '' },
        { name: 'Blue', value: '#3B82F6', image: '' },
        { name: 'Pink', value: '#EC4899', image: '' },
        { name: 'Light Blue', value: '#60A5FA', image: '' },
        { name: 'Navy', value: '#1E40AF', image: '' }
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      offers: [
        {
          type: 'Bank Offer',
          description: '10% Off on Supermoney UPI. Max discount of ₹50. Minimum order value of ₹250.',
          terms: 'T&C'
        },
        {
          type: 'Bank Offer', 
          description: '5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter',
          terms: 'T&C'
        },
        {
          type: 'Bank Offer',
          description: '5% cashback on Axis Bank Flipkart Debit Card',
          terms: 'T&C'
        },
        {
          type: 'Combo Offer',
          description: 'Buy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%',
          terms: 'T&C',
          link: 'See all products'
        }
      ],
      additionalOffers: 10
    },
    2: {
      brand: "RUNWAY",
      title: "Elegant Evening Dress - Premium Collection",
      images: [],
      colors: [
        { name: 'Maroon', value: '#7C2D12', image: '' },
        { name: 'Green', value: '#10B981', image: '' },
        { name: 'Golden', value: '#FFD700', image: '' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      offers: [
        {
          type: 'Bank Offer',
          description: '10% Off on Supermoney UPI. Max discount of ₹50. Minimum order value of ₹250.',
          terms: 'T&C'
        },
        {
          type: 'Combo Offer',
          description: 'Buy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%',
          terms: 'T&C'
        }
      ],
      additionalOffers: 8
    },
    // Enhanced data for some ShopPage products
    22: {
      brand: "RUNWAY",
      title: "Ombre Pink Kurti with Handpaint",
      images: [],
      colors: [
        { name: 'Pink', value: '#EC4899', image: 'https://i.postimg.cc/0Q5TFBWh/AVP02939.jpg' },
        { name: 'Lavender', value: '#C4B5FD', image: 'https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      offers: [
        {
          type: 'Bank Offer',
          description: '10% Off on Supermoney UPI. Max discount of ₹50. Minimum order value of ₹250.',
          terms: 'T&C'
        },
        {
          type: 'Combo Offer',
          description: 'Buy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%',
          terms: 'T&C'
        }
      ],
      additionalOffers: 5
    },
    25: {
      brand: "RUNWAY",
      title: "Yellow Handpaint Kurti Set",
      images: [],
      colors: [
        { name: 'Yellow', value: '#FDE047', image: 'https://i.postimg.cc/4dZcgzVD/AVP02971.jpg' },
        { name: 'Aqua Blue', value: '#06B6D4', image: 'https://i.postimg.cc/jdZCWpNk/AVP03127.jpg' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      offers: [
        {
          type: 'Bank Offer',
          description: '10% Off on Supermoney UPI. Max discount of ₹50. Minimum order value of ₹250.',
          terms: 'T&C'
        },
        {
          type: 'Combo Offer',
          description: 'Buy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%',
          terms: 'T&C'
        }
      ],
      additionalOffers: 5
    },
    30: {
      brand: "RUNWAY",
      title: "Beige Midi Dress",
      images: [],
      colors: [
        { name: 'Beige', value: '#F5F5DC', image: 'https://i.postimg.cc/P5Sfx1GG/AVP03051.jpg' },
        { name: 'Wine', value: '#7C2D12', image: 'https://i.postimg.cc/25YtPK9r/AVP03180.jpg' }
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      offers: [
        {
          type: 'Bank Offer',
          description: '10% Off on Supermoney UPI. Max discount of ₹50. Minimum order value of ₹250.',
          terms: 'T&C'
        },
        {
          type: 'Combo Offer',
          description: 'Buy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%',
          terms: 'T&C'
        }
      ],
      additionalOffers: 5
    }
    // Note: For products without specific enhanced data, we'll use defaults
  };

  // Sample products data from ShopPage (IDs 1-21 and 22-56)
  const allProducts = [
    // Existing products 1-20
    {
      id: 1,
      name: "Premium Cotton Blend T-Shirt",
      price: 1599,
      originalPrice: 2499,
      discount: 36,
      rating: 4.5,
      reviews: 128,
      image: "",
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
      image: "",
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
      image: "",
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
      image: "",
      category: "child-girl"
    },
    {
      id: 5,
      name: "Professional Blazer",
      price: 5999,
      originalPrice: 8999,
      discount: 33,
      rating: 4.7,
      reviews: 87,
      image: "",
      category: "child-boy"
    },
    {
      id: 6,
      name: "Comfortable Yoga Pants",
      price: 1899,
      originalPrice: 2699,
      discount: 30,
      rating: 4.4,
      reviews: 312,
      image: "",
      category: "child-boy"
    },
    {
      id: 7,
      name: "Ethnic Indo Western Outfit",
      price: 4599,
      originalPrice: 6999,
      discount: 34,
      rating: 4.6,
      reviews: 89,
      image: "",
      category: "ethnic-woman"
    },
    {
      id: 8,
      name: "Festive Traditional Wear",
      price: 3299,
      originalPrice: 4999,
      discount: 34,
      rating: 4.5,
      reviews: 145,
      image: "",
      category: "ethnic-woman"
    },
    {
      id: 9,
      name: "Girls Casual Dress",
      price: 1499,
      originalPrice: 2199,
      discount: 32,
      rating: 4.3,
      reviews: 267,
      image: "",
      category: "child-girl"
    },
    {
      id: 10,
      name: "Boys Casual Outfit",
      price: 1799,
      originalPrice: 2499,
      discount: 28,
      rating: 4.4,
      reviews: 198,
      image: "",
      category: "child-boy"
    },
    {
      id: 11,
      name: "Night Suit Set",
      price: 999,
      originalPrice: 1499,
      discount: 33,
      rating: 4.2,
      reviews: 345,
      image: "",
      category: "child-girl"
    },
    {
      id: 12,
      name: "Baby Cotton Wear",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      rating: 4.7,
      reviews: 456,
      image: "",
      category: "child-boy"
    },
    {
      id: 13,
      name: "Vacation Beach Wear",
      price: 2299,
      originalPrice: 3299,
      discount: 30,
      rating: 4.5,
      reviews: 123,
      image: "",
      category: "ethnic-woman"
    },
    {
      id: 14,
      name: "Designer Ethnic Kurta",
      price: 1899,
      originalPrice: 2799,
      discount: 32,
      rating: 4.6,
      reviews: 189,
      image: "",
      category: "ethnic-woman"
    },
    {
      id: 15,
      name: "Traditional Lehenga",
      price: 6999,
      originalPrice: 9999,
      discount: 30,
      rating: 4.8,
      reviews: 67,
      image: "",
      category: "ethnic-woman"
    },
    {
      id: 16,
      name: "Casual Summer Top",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      rating: 4.2,
      reviews: 234,
      image: "",
      category: "child-girl"
    },
    {
      id: 17,
      name: "Formal Shirt Set",
      price: 1599,
      originalPrice: 2299,
      discount: 30,
      rating: 4.4,
      reviews: 156,
      image: "",
      category: "child-boy"
    },
    {
      id: 18,
      name: "Cotton Casual Wear",
      price: 1299,
      originalPrice: 1899,
      discount: 32,
      rating: 4.3,
      reviews: 298,
      image: "",
      category: "child-girl"
    },
    {
      id: 19,
      name: "Elegant Party Dress",
      price: 3999,
      originalPrice: 5999,
      discount: 33,
      rating: 4.7,
      reviews: 89,
      image: "",
      category: "ethnic-woman"
    },
    {
      id: 20,
      name: "Designer Ethnic Wear",
      price: 2899,
      originalPrice: 4299,
      discount: 33,
      rating: 4.5,
      reviews: 145,
      image: "",
      category: "ethnic-woman"
    },
    // Additional products from ShopPage (IDs 22-56)
    {
      id: 22,
      name: "Ombre pink kurti with handpaint",
      price: 2199,
      originalPrice: 2499,
      discount: 36,
      rating: 4.5,
      reviews: 128,
      image: "https://i.postimg.cc/0Q5TFBWh/AVP02939.jpg",
      category: "ethnic-woman"
    },
    {
      id: 23,
      name: "Sky blue kurti set",
      price: 1999,
      originalPrice: 6999,
      discount: 29,
      rating: 4.8,
      reviews: 95,
      image: "https://i.postimg.cc/JhSTcdwb/AVP02949.jpg",
      category: "ethnic-woman"
    },
    {
      id: 24,
      name: "Lavender ombre kurti set",
      price: 1899,
      originalPrice: 3999,
      discount: 28,
      rating: 4.3,
      reviews: 156,
      image: "https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg",
      category: "child-girl"
    },
    {
      id: 25,
      name: "Yellow handpaint kurti set",
      price: 1999,
      originalPrice: 4999,
      discount: 28,
      rating: 4.6,
      reviews: 203,
      image: "https://i.postimg.cc/4dZcgzVD/AVP02971.jpg",
      category: "child-girl"
    },
    {
      id: 26,
      name: "A line plated kurti set",
      price: 2299,
      originalPrice: 8999,
      discount: 33,
      rating: 4.7,
      reviews: 87,
      image: "https://i.postimg.cc/mDbPqTGR/AVP02989.jpg",
      category: "child-boy"
    },
    {
      id: 27,
      name: "Plated kurti set",
      price: 1799,
      originalPrice: 2699,
      discount: 30,
      rating: 4.4,
      reviews: 312,
      image: "https://i.postimg.cc/Px35RZ4z/AVP03001.jpg",
      category: "child-boy"
    },
    {
      id: 28,
      name: "Yellow color block design dress",
      price: 1599,
      originalPrice: 6999,
      discount: 34,
      rating: 4.6,
      reviews: 89,
      image: "https://i.postimg.cc/RC2HC571/AVP03017.jpg",
      category: "ethnic-woman"
    },
    {
      id: 29,
      name: "Designer cotton kurta",
      price: 2299,
      originalPrice: 4999,
      discount: 34,
      rating: 4.5,
      reviews: 145,
      image: "https://i.postimg.cc/hGGjbp8P/AVP03031.jpg",
      category: "ethnic-woman"
    },
    {
      id: 30,
      name: "Beige midi dress",
      price: 1699,
      originalPrice: 2199,
      discount: 32,
      rating: 4.3,
      reviews: 267,
      image: "https://i.postimg.cc/P5Sfx1GG/AVP03051.jpg",
      category: "child-girl"
    },
    {
      id: 31,
      name: "A line kurti set",
      price: 1999,
      originalPrice: 2499,
      discount: 28,
      rating: 4.4,
      reviews: 198,
      image: "https://i.postimg.cc/Zq1SBcVQ/AVP03066.jpg",
      category: "child-boy"
    },
    {
      id: 32,
      name: "Green plazzo kurti set",
      price: 1699,
      originalPrice: 1499,
      discount: 33,
      rating: 4.2,
      reviews: 345,
      image: "https://i.postimg.cc/Vv009D8b/AVP03081.jpg",
      category: "child-girl"
    },
    {
      id: 33,
      name: "Lavender ombre kurti set",
      price: 1899,
      originalPrice: 1199,
      discount: 33,
      rating: 4.7,
      reviews: 456,
      image: "https://i.postimg.cc/d0W94HzW/AVP03096.jpg",
      category: "child-boy"
    },
    {
      id: 34,
      name: "Green kurti with handpaint sleeves",
      price: 1999,
      originalPrice: 3299,
      discount: 30,
      rating: 4.5,
      reviews: 123,
      image: "https://i.postimg.cc/qMXy1DK8/AVP03114.jpg",
      category: "ethnic-woman"
    },
    {
      id: 35,
      name: "Aqua blue hand paint kurti",
      price: 2099,
      originalPrice: 2799,
      discount: 32,
      rating: 4.6,
      reviews: 189,
      image: "https://i.postimg.cc/jdZCWpNk/AVP03127.jpg",
      category: "ethnic-woman"
    },
    {
      id: 36,
      name: "Purple handpaint kurti set",
      price: 2199,
      originalPrice: 9999,
      discount: 30,
      rating: 4.8,
      reviews: 67,
      image: "https://i.postimg.cc/wMFxmNts/AVP03138.jpg",
      category: "ethnic-woman"
    },
    {
      id: 37,
      name: "Pink kurti set",
      price: 1799,
      originalPrice: 1299,
      discount: 31,
      rating: 4.2,
      reviews: 234,
      image: "https://i.postimg.cc/yYdsGkgv/AVP03155.jpg",
      category: "child-girl"
    },
    {
      id: 38,
      name: "A line dress",
      price: 1499,
      originalPrice: 2299,
      discount: 30,
      rating: 4.4,
      reviews: 156,
      image: "https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg",
      category: "child-girl"
    },
    {
      id: 39,
      name: "Wine midi dress",
      price: 1499,
      originalPrice: 1899,
      discount: 32,
      rating: 4.3,
      reviews: 298,
      image: "https://i.postimg.cc/25YtPK9r/AVP03180.jpg",
      category: "child-girl"
    },
    {
      id: 40,
      name: "Orange one piece dress",
      price: 1599,
      originalPrice: 5999,
      discount: 33,
      rating: 4.7,
      reviews: 89,
      image: "https://i.postimg.cc/jjvMBdJ4/AVP03194.jpg",
      category: "ethnic-woman"
    },
    {
      id: 41,
      name: "coming soon",
      price: 12000,
      originalPrice: 4299,
      discount: 33,
      rating: 4.5,
      reviews: 145,
      image: "https://i.postimg.cc/SKQBnP6V/AVP03208.jpg",
      category: "ethnic-woman"
    },
    {
      id: 42,
      name: "coming soon",
      price: 12000,
      originalPrice: 2199,
      discount: 32,
      rating: 4.3,
      reviews: 267,
      image: "https://i.postimg.cc/d1rjwshf/AVP03233.jpg",
      category: "child-girl"
    },
    {
      id: 43,
      name: "Ombre pink kurti with handpaint",
      price: 2199,
      originalPrice: 2499,
      discount: 36,
      rating: 4.5,
      reviews: 128,
      image: "https://i.postimg.cc/0Q5TFBWh/AVP02939.jpg",
      category: "ethnic-woman"
    },
    {
      id: 44,
      name: "Sky blue kurti set",
      price: 1999,
      originalPrice: 6999,
      discount: 29,
      rating: 4.8,
      reviews: 95,
      image: "https://i.postimg.cc/JhSTcdwb/AVP02949.jpg",
      category: "ethnic-woman"
    },
    {
      id: 45,
      name: "Lavender ombre kurti set",
      price: 1899,
      originalPrice: 3999,
      discount: 28,
      rating: 4.3,
      reviews: 156,
      image: "https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg",
      category: "child-girl"
    },
    {
      id: 46,
      name: "Yellow handpaint kurti set",
      price: 1999,
      originalPrice: 4999,
      discount: 28,
      rating: 4.6,
      reviews: 203,
      image: "https://i.postimg.cc/4dZcgzVD/AVP02971.jpg",
      category: "child-girl"
    },
    {
      id: 47,
      name: "A line plated kurti set",
      price: 2299,
      originalPrice: 8999,
      discount: 33,
      rating: 4.7,
      reviews: 87,
      image: "https://i.postimg.cc/mDbPqTGR/AVP02989.jpg",
      category: "child-boy"
    },
    {
      id: 48,
      name: "Plated kurti set",
      price: 1799,
      originalPrice: 2699,
      discount: 30,
      rating: 4.4,
      reviews: 312,
      image: "https://i.postimg.cc/Px35RZ4z/AVP03001.jpg",
      category: "child-boy"
    },
    {
      id: 49,
      name: "Yellow color block design dress",
      price: 1599,
      originalPrice: 6999,
      discount: 34,
      rating: 4.6,
      reviews: 89,
      image: "https://i.postimg.cc/RC2HC571/AVP03017.jpg",
      category: "ethnic-woman"
    },
    {
      id: 50,
      name: "Designer cotton kurta",
      price: 2299,
      originalPrice: 4999,
      discount: 34,
      rating: 4.5,
      reviews: 145,
      image: "https://i.postimg.cc/hGGjbp8P/AVP03031.jpg",
      category: "ethnic-woman"
    },
    {
      id: 51,
      name: "Beige midi dress",
      price: 1699,
      originalPrice: 2199,
      discount: 32,
      rating: 4.3,
      reviews: 267,
      image: "https://i.postimg.cc/P5Sfx1GG/AVP03051.jpg",
      category: "child-girl"
    },
    {
      id: 52,
      name: "A line kurti set",
      price: 1999,
      originalPrice: 2499,
      discount: 28,
      rating: 4.4,
      reviews: 198,
      image: "https://i.postimg.cc/Zq1SBcVQ/AVP03066.jpg",
      category: "child-boy"
    },
    {
      id: 53,
      name: "Green plazzo kurti set",
      price: 1699,
      originalPrice: 1499,
      discount: 33,
      rating: 4.2,
      reviews: 345,
      image: "https://i.postimg.cc/Vv009D8b/AVP03081.jpg",
      category: "child-girl"
    },
    {
      id: 54,
      name: "Lavender ombre kurti set",
      price: 1899,
      originalPrice: 1199,
      discount: 33,
      rating: 4.7,
      reviews: 456,
      image: "https://i.postimg.cc/d0W94HzW/AVP03096.jpg",
      category: "child-boy"
    },
    {
      id: 55,
      name: "Green kurti with handpaint sleeves",
      price: 1999,
      originalPrice: 3299,
      discount: 30,
      rating: 4.5,
      reviews: 123,
      image: "https://i.postimg.cc/qMXy1DK8/AVP03114.jpg",
      category: "ethnic-woman"
    },
    {
      id: 56,
      name: "Aqua blue hand paint kurti",
      price: 2099,
      originalPrice: 2799,
      discount: 32,
      rating: 4.6,
      reviews: 189,
      image: "https://i.postimg.cc/jdZCWpNk/AVP03127.jpg",
      category: "ethnic-woman"
    }
  ];

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
          const foundProduct = allProducts.find(p => p.id === parseInt(id));
          if (foundProduct) {
            setProduct(foundProduct);
            // Set default selections
            const enhanced = enhancedProducts[foundProduct.id];
            if (enhanced) {
              if (enhanced.colors && enhanced.colors.length > 0) setSelectedColor(enhanced.colors[0].name);
              if (enhanced.sizes && enhanced.sizes.length > 0) setSelectedSize(enhanced.sizes[0]);
            }
          } else {
            setError('Product not found');
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (product) {
      try {
        cartService.addToCart(product, 1);
        setCartUpdateTrigger(prev => prev + 1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const getCartQuantity = (productId) => {
    const cart = cartService.getCart();
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/shop" className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-secondary transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const enhanced = enhancedProducts[product.id] || {
    brand: "RUNWAY",
    title: product.name,
    images: [],
    colors: [
      { name: 'Default', value: '#6B7280', image: '' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    offers: [
      {
        type: 'Bank Offer',
        description: '10% Off on Supermoney UPI. Max discount of ₹50. Minimum order value of ₹250.',
        terms: 'T&C'
      },
      {
        type: 'Combo Offer',
        description: 'Buy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%',
        terms: 'T&C'
      }
    ],
    additionalOffers: 5
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const currentImages = enhanced.images || [product.image];
  // Removed image handling since we're removing all images

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-primary">Home</Link>
            <span className="text-gray-400">›</span>
            <Link to="/shop" className="text-gray-500 hover:text-brand-primary">Clothing and Accessories</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Topwear</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Shirts</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Men's Shirts</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Casual Shirts</span>
            <span className="text-gray-400">›</span>
            <span className="text-brand-primary font-medium">METRONAUT...</span>
            <span className="text-gray-400">›</span>
            <span className="text-brand-primary font-medium">METRONAU...</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Product Images */}
          <div className="space-y-4">
            {/* Thumbnail Images - Removed since we're removing all images */}
            <div className="flex gap-2 overflow-x-auto">
              {/* Removed thumbnail images since we're removing all images */}
              <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-image text-gray-400"></i>
              </div>
            </div>

            {/* Main Product Image - Removed since we're removing all images */}
            <div className="aspect-[4/5] bg-white rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <i className="fa-solid fa-image text-4xl text-gray-400"></i>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={addToCart}
                className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-shopping-cart"></i>
                ADD TO CART
              </button>
              <button className="bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-bolt"></i>
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Product Title & Brand */}
            <div>
              <p className="text-gray-600 text-sm">{enhanced.brand || "RUNWAY"}</p>
              <h1 className="text-2xl font-semibold text-gray-900 mt-1">
                {enhanced.title || product.name}
              </h1>
            </div>

            {/* Price & Rating */}
            <div>
              <p className="text-green-600 text-sm font-medium mb-2">Special price</p>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="text-green-600 font-bold">{product.discount}% off</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
                  <span>{product.rating}</span>
                  <i className="fa-solid fa-star text-xs"></i>
                </div>
                <span className="text-gray-600 text-sm">{product.reviews} ratings and 0 reviews</span>
                {/* Removed assured badge image since we're removing all images */}
                <div className="h-5 w-5 bg-gray-200 rounded flex items-center justify-center">
                  <i className="fa-solid fa-shield text-xs text-gray-400"></i>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            {enhanced.colors && enhanced.colors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3">
                  {enhanced.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        // Removed image index handling since we're removing all images
                      }}
                      className={`w-16 h-20 border-2 rounded-lg overflow-hidden flex items-center justify-center ${
                        selectedColor === color.name ? 'border-brand-primary' : 'border-gray-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color.value }}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {enhanced.sizes && enhanced.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <button className="text-brand-primary text-sm font-medium">Size Chart</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {enhanced.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                        selectedSize === size 
                          ? 'border-brand-primary text-brand-primary bg-blue-50' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Available Offers */}
            {enhanced.offers && enhanced.offers.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Available offers</h3>
                <div className="space-y-2">
                  {enhanced.offers.map((offer, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <i className="fa-solid fa-tag text-green-600 mt-1 text-sm"></i>
                      <div className="text-sm">
                        <span className="font-medium">{offer.type}</span> {offer.description}
                        <button className="text-brand-primary ml-1 font-medium">{offer.terms}</button>
                        {offer.link && (
                          <button className="text-brand-primary ml-1 font-medium">{offer.link}</button>
                        )}
                      </div>
                    </div>
                  ))}
                  {enhanced.additionalOffers && (
                    <button className="text-brand-primary text-sm font-medium">
                      +{enhanced.additionalOffers} more offers
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-location-dot text-gray-600"></i>
                <h3 className="font-medium text-gray-900">Deliver to</h3>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Enter pincode"
                  className="border border-gray-300 px-3 py-2 rounded-lg text-sm flex-1"
                />
                <button className="text-brand-primary font-medium text-sm">Check</button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-truck text-gray-600"></i>
                  <span className="text-sm text-gray-700">Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-alt text-gray-600"></i>
                  <span className="text-sm text-gray-700">7 days Return Policy</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">Services</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-money-bill text-blue-600"></i>
                  <span>Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-undo text-blue-600"></i>
                  <span>Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;