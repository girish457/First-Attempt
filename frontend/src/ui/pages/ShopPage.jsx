import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cartService } from '../../services/cart.js';
import { AuthService } from '../../services/auth.js';

const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('default');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('new-arrival'); // Add this for feature tabs
  const productsPerPage = 28;
  const [expandedSections, setExpandedSections] = useState({
    price: false,
    size: false,
    color: false,
    discount: false,
    fabric: false,
    neckline: false,
    sleeveType: false
  });
  const [selectedFilters, setSelectedFilters] = useState({
    price: { min: 0, max: 10000 },
    size: [],
    color: [],
    discount: [],
    fabric: [],
    neckline: [],
    sleeveType: []
  });
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const filterDropdownRef = useRef(null);
  const filterSidebarRef = useRef(null);

  // Create a mapping of image URLs to products for IDs 1-21
  const products1To21 = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
      name: "Designer kurti paint",
      price: 2299,
      originalPrice: 4999,
      discount: 34,
      rating: 4.5,
      reviews: 145,
      image: "https://i.postimg.cc/hGGjbp8P/AVP03031.jpg",
      category: "ethnic-woman"
    },
    {
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
      name: "A line dress",
      price: 1499,
      originalPrice: 2299,
      discount: 30,
      rating: 4.4,
      reviews: 156,
      image: "https://i.postimg.cc/JhWwRn0w/AVP03166.jpg",
      category: "child-boy"
    },
    {
      id: 18,
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
      id: 19,
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
      id: 20,
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
      id: 21,
      name: "coming soon",
      price: 12000,
      originalPrice: 2199,
      discount: 32,
      rating: 4.3,
      reviews: 267,
      image: "https://i.postimg.cc/d1rjwshf/AVP03233.jpg",
      category: "child-girl"
    }
  ];

  // Create a map of image URLs to products for IDs 1-21
  const imageToProductMap = {};
  products1To21.forEach(product => {
    imageToProductMap[product.image] = product;
  });

  // Define product arrays for feature tabs
  const newArrivalProducts = [
    products1To21[0],  // Ombre pink kurti with handpaint
    products1To21[3],  // Yellow handpaint kurti set
    products1To21[6],  // Yellow color block design dress
    products1To21[9],  // A line kurti set
    products1To21[12], // Green kurti with handpaint sleeves
    products1To21[15], // Pink kurti set
    products1To21[18]  // Orange one piece dress
  ];

  const bestSellerProducts = [
    products1To21[1],  // Sky blue kurti set
    products1To21[4],  // A line plated kurti set
    products1To21[7],  // Designer kurti paint
    products1To21[10], // Green plazzo kurti set
    products1To21[13], // Aqua blue hand paint kurti
    products1To21[16], // A line dress
    products1To21[19]  // coming soon
  ];

  const topProducts = [
    products1To21[2],  // Lavender ombre kurti set
    products1To21[5],  // Plated kurti set
    products1To21[8],  // Beige midi dress
    products1To21[11], // Lavender ombre kurti set
    products1To21[14], // Purple handpaint kurti set
    products1To21[17], // Wine midi dress
    products1To21[20]  // coming soon
  ];

  // Sample products data (28 products for 7 rows of 4)
  const products = [
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
      name: "Designer kurti paint",
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
      id: 40,
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
      id: 41,
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
      id: 42,
      name: "Yellow color block design dress",
      price: 1599,
      originalPrice: 6999,
      discount: 34,
      rating: 4.6,
      reviews: 89,
      image: "https://i.postimg.cc/RC2HC571/AVP03017.jpg",
      category: "ethnic-woman"
    },
    // Additional products for pagination (43-56)
    {
      id: 43,
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
      id: 44,
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
      id: 45,
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
      id: 46,
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
    }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? [...products1To21, ...products] // Include all products when 'all' is selected
    : selectedCategory === 'handpaint-love'
      ? [...products1To21, ...products].filter(product =>
          (product.name || '').toLowerCase().includes('handpaint') ||
          (product.name || '').toLowerCase().includes('hand paint') ||
          [
            'https://i.postimg.cc/0Q5TFBWh/AVP02939.jpg',
            'https://i.postimg.cc/jdZCWpNk/AVP03127.jpg',
            'https://i.postimg.cc/4dZcgzVD/AVP02971.jpg',
            'https://i.postimg.cc/wMFxmNts/AVP03138.jpg',
            'https://i.postimg.cc/qMXy1DK8/AVP03114.jpg'
          ].includes(product.image)
        )
      : selectedCategory === 'ethnic-woman' // Royal Aura
        ? [...products1To21, ...products].filter(product =>
            [
              'https://i.postimg.cc/RC2HC571/AVP03017.jpg',
              'https://i.postimg.cc/jjvMBdJ4/AVP03194.jpg',
              'https://i.postimg.cc/25YtPK9r/AVP03180.jpg',
              'https://i.postimg.cc/P5Sfx1GG/AVP03051.jpg',
              'https://i.postimg.cc/JhWwRn0w/AVP03166.jpg'
            ].includes(product.image)
          )
        : selectedCategory === 'child-girl' // Everyday Elegance
          ? [...products1To21, ...products].filter(product =>
              [
                'https://i.postimg.cc/JhSTcdwb/AVP02949.jpg',
                'https://i.postimg.cc/d0W94HzW/AVP03096.jpg',
                'https://i.postimg.cc/Vv009D8b/AVP03081.jpg',
                'https://i.postimg.cc/Px35RZ4z/AVP03001.jpg',
                'https://i.postimg.cc/hGGjbp8P/AVP03031.jpg'
              ].includes(product.image)
            )
          : selectedCategory === 'child-boy' // Threads Loom
            ? [...products1To21, ...products].filter(product =>
                [
                  'https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg',
                  'https://i.postimg.cc/mDbPqTGR/AVP02989.jpg',
                  'https://i.postimg.cc/Zq1SBcVQ/AVP03066.jpg',
                  'https://i.postimg.cc/yYdsGkgv/AVP03155.jpg'
                ].includes(product.image)
              )
            : [...products1To21, ...products].filter(product => product.category === selectedCategory);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle filter section toggle
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    if (category === 'price') {
      setSelectedFilters(prev => ({
        ...prev,
        price: value
      }));
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }));
    }
  };

  // Handle filter selection for sort dropdown
  const handleFilterSelect = (filterValue) => {
    setSelectedFilter(filterValue);
    setShowFilterDropdown(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      price: { min: 0, max: 10000 },
      size: [],
      color: [],
      discount: [],
      fabric: [],
      neckline: [],
      sleeveType: []
    });
  };

  // Handle outside clicks for dropdown and sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
      if (filterSidebarRef.current && !filterSidebarRef.current.contains(event.target)) {
        const filterButton = document.querySelector('[data-filter-button]');
        if (!filterButton || !filterButton.contains(event.target)) {
          setIsFilterSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to handle category from URL parameters and update URL when category changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    
    // If URL has a category parameter and it's different from current selection
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1); // Reset to first page when category changes
    }
    // If no category parameter in URL, set to 'all'
    else if (!categoryParam && selectedCategory !== 'all') {
      setSelectedCategory('all');
      setCurrentPage(1); // Reset to first page when category changes
    }
  }, [searchParams, setSearchParams]);

  // Category filter options
  const categoryOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'ethnic-woman', label: 'Royal Aura' },
    { value: 'child-girl', label: 'Everyday Elegance' },
    { value: 'child-boy', label: 'Threads Loom' },
    { value: 'handpaint-love', label: 'Handpaint Love' }
  ];

  // Filter options and data
  const filterOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'discount', label: 'Sort by Discount' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Best Rated' }
  ];

  const sizeOptions = [
    { value: 'XXS', label: 'XXS', count: 118 },
    { value: 'XS', label: 'XS', count: 121 },
    { value: 'S', label: 'S', count: 119 },
    { value: 'M', label: 'M', count: 120 },
    { value: 'L', label: 'L', count: 117 },
    { value: 'XL', label: 'XL', count: 119 },
    { value: 'XXL', label: 'XXL', count: 102 },
    { value: '2XL', label: '2XL', count: 12 },
    { value: 'XXXL', label: 'XXXL', count: 105 },
    { value: '3XL', label: '3XL', count: 12 },
    { value: '4XL', label: '4XL', count: 2 },
    { value: '5XL', label: '5XL', count: 2 }
  ];

  const colorOptions = [
    { value: 'Blue', label: 'Blue', color: '#3B82F6', count: 18 },
    { value: 'Beige', label: 'Beige', color: '#F5F5DC', count: 5 },
    { value: 'Brown', label: 'Brown', color: '#8B4513', count: 5 },
    { value: 'Black', label: 'Black', color: '#000000', count: 8 },
    { value: 'Green', label: 'Green', color: '#10B981', count: 11 },
    { value: 'Grey', label: 'Grey', color: '#6B7280', count: 3 },
    { value: 'Mustard', label: 'Mustard', color: '#FBBF24', count: 1 },
    { value: 'Multi-Color', label: 'Multi-Color', color: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)', count: 1 },
    { value: 'Maroon', label: 'Maroon', color: '#7C2D12', count: 2 },
    { value: 'Orange', label: 'Orange', color: '#F97316', count: 1 },
    { value: 'Purple', label: 'Purple', color: '#8B5CF6', count: 6 },
    { value: 'Pink', label: 'Pink', color: '#EC4899', count: 15 },
    { value: 'Peach', label: 'Peach', color: '#FDBA74', count: 2 },
    { value: 'Red', label: 'Red', color: '#EF4444', count: 12 },
    { value: 'White', label: 'White', color: '#FFFFFF', count: 8 },
    { value: 'Yellow', label: 'Yellow', color: '#FDE047', count: 18 },
    { value: 'Lavender', label: 'Lavender', color: '#C4B5FD', count: 1 },
    { value: 'Golden', label: 'Golden', color: '#FFD700', count: 25 },
    { value: 'Copper', label: 'Copper', color: '#B87333', count: 8 },
    { value: 'Bronze', label: 'Bronze', color: '#CD7F32', count: 6 }
  ];

  const discountOptions = [
    { value: '70', label: '70%', count: 1 },
    { value: '60', label: '60%', count: 31 },
    { value: '50', label: '50%', count: 11 },
    { value: '40', label: '40%', count: 41 },
    { value: '30', label: '30%', count: 5 },
    { value: '20', label: '20%', count: 7 },
    { value: '15', label: '15%', count: 4 },
    { value: '5', label: '5%', count: 12 }
  ];

  const fabricOptions = [
    { value: 'Cotton', label: 'Cotton' },
    { value: 'Polyester', label: 'Polyester' },
    { value: 'Silk', label: 'Silk' },
    { value: 'Wool', label: 'Wool' },
    { value: 'Linen', label: 'Linen' },
    { value: 'Denim', label: 'Denim' }
  ];

  const necklineOptions = [
    { value: 'Round Neck', label: 'Round Neck' },
    { value: 'V-Neck', label: 'V-Neck' },
    { value: 'Collar', label: 'Collar' },
    { value: 'Scoop', label: 'Scoop' },
    { value: 'Halter', label: 'Halter' }
  ];

  const sleeveTypeOptions = [
    { value: 'Short Sleeve', label: 'Short Sleeve' },
    { value: 'Long Sleeve', label: 'Long Sleeve' },
    { value: 'Sleeveless', label: 'Sleeveless' },
    { value: '3/4 Sleeve', label: '3/4 Sleeve' }
  ];

  const getFilterLabel = () => {
    const option = filterOptions.find(opt => opt.value === selectedFilter);
    return option ? option.label : 'Filter by Category';
  };

  // Add to cart function - no alert, just update cart count
  const addToCart = (product) => {
    try {
      cartService.addToCart(product, 1);
      setCartUpdateTrigger(prev => prev + 1); // Trigger re-render
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Update cart quantity (for + and - buttons that appear after adding)
  const updateCartQuantity = (product, change) => {
    try {
      const currentCart = cartService.getCart();
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
          cartService.removeFromCart(product.id);
        } else {
          cartService.updateCartItem(product.id, newQuantity);
        }
        setCartUpdateTrigger(prev => prev + 1); // Trigger re-render
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Get quantity from cart
  const getCartQuantity = (productId) => {
    const cart = cartService.getCart();
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return getCartQuantity(productId) > 0;
  };

  // Wishlist functions
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const addToWishlist = (productId) => {
    const authService = new AuthService();
    if (!authService.isAuthenticated()) {
      alert('Please login to add items to wishlist');
      return;
    }
    
    const product = [...products, ...products1To21].find(p => p.id === productId);
    if (product && !isInWishlist(productId)) {
      setWishlistItems(prev => [...prev, product]);
      // Here you would typically make an API call to save to backend
      // For now, we're just updating local state
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    // Here you would typically make an API call to remove from backend
  };

  // Navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Category Filter Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setCurrentPage(1); // Reset to first page when category changes
                  // Update URL parameters
                  if (category.value === 'all') {
                    searchParams.delete('category');
                  } else {
                    searchParams.set('category', category.value);
                  }
                  setSearchParams(searchParams);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEW ARRIVALS Section removed */}

      {/* Top Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-6">
              <button 
                data-filter-button
                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
                <span className="text-sm font-medium">Show filters</span>
              </button>
              
              <p className="text-gray-900 font-medium">
                {filteredProducts.length} products
              </p>
            </div>

            {/* Right section - Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Sort by</span>
              <div className="relative" ref={filterDropdownRef}>
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-1 text-gray-900 font-medium hover:text-gray-700 transition-colors"
                >
                  {getFilterLabel()}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fadeIn">
                    <div className="py-1">
                      {filterOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleFilterSelect(option.value)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                            selectedFilter === option.value ? 'text-gray-900 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Sidebar */}
        <div
          ref={filterSidebarRef}
          className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
            isFilterSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
              <button
                onClick={() => setIsFilterSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Price Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('price')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Price</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.price && (
                  <div className="px-4 pb-4">
                    <div className="space-y-4">
                      {/* Dual Range Slider */}
                      <div className="relative px-1 py-2">
                        <div className="relative h-1">
                          {/* Background Track */}
                          <div className="absolute w-full h-1 bg-gray-300 rounded-full"></div>
                          
                          {/* Active Track Between Handles */}
                          <div 
                            className="absolute h-1 bg-gray-400 rounded-full"
                            style={{
                              left: `${(selectedFilters.price.min / 10000) * 100}%`,
                              width: `${((selectedFilters.price.max - selectedFilters.price.min) / 10000) * 100}%`
                            }}
                          ></div>
                        </div>
                        
                        {/* Min Range Slider */}
                        <input
                          type="range"
                          min="0"
                          max={selectedFilters.price.max}
                          value={selectedFilters.price.min}
                          onChange={(e) => {
                            const value = Math.min(parseInt(e.target.value), selectedFilters.price.max - 1);
                            handleFilterChange('price', { ...selectedFilters.price, min: value });
                          }}
                          className="absolute top-0 w-full h-5 bg-transparent appearance-none cursor-pointer range-slider-min"
                          style={{ zIndex: 1 }}
                        />
                        
                        {/* Max Range Slider */}
                        <input
                          type="range"
                          min={selectedFilters.price.min}
                          max="10000"
                          value={selectedFilters.price.max}
                          onChange={(e) => {
                            const value = Math.max(parseInt(e.target.value), selectedFilters.price.min + 1);
                            handleFilterChange('price', { ...selectedFilters.price, max: value });
                          }}
                          className="absolute top-0 w-full h-5 bg-transparent appearance-none cursor-pointer range-slider-max"
                          style={{ zIndex: 2 }}
                        />
                      </div>
                      
                      {/* Price Input Fields with Rupee Symbol */}
                      <div className="flex items-center gap-3 text-sm">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                          <input
                            type="number"
                            value={selectedFilters.price.min}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              if (value < selectedFilters.price.max) {
                                handleFilterChange('price', { ...selectedFilters.price, min: value });
                              }
                            }}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="0"
                          />
                        </div>
                        <span className="text-gray-500 font-medium">to</span>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                          <input
                            type="number"
                            value={selectedFilters.price.max}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 10000;
                              if (value > selectedFilters.price.min) {
                                handleFilterChange('price', { ...selectedFilters.price, max: value });
                              }
                            }}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="10000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('size')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Size</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.size ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.size && (
                  <div className="px-4 pb-4 space-y-2">
                    {sizeOptions.map(size => (
                      <label key={size.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.size.includes(size.value)}
                          onChange={() => handleFilterChange('size', size.value)}
                          className="mr-3 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-700">
                          {size.label} ({size.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('color')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Color</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.color ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.color && (
                  <div className="px-4 pb-4 space-y-2">
                    {colorOptions.map(color => (
                      <label key={color.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.color.includes(color.value)}
                          onChange={() => handleFilterChange('color', color.value)}
                          className="mr-3 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <div
                          className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                          style={{ backgroundColor: color.color }}
                        />
                        <span className="text-sm text-gray-700">
                          {color.label} ({color.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('discount')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Discount</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.discount ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.discount && (
                  <div className="px-4 pb-4 space-y-2">
                    {discountOptions.map(discount => (
                      <label key={discount.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.discount.includes(discount.value)}
                          onChange={() => handleFilterChange('discount', discount.value)}
                          className="mr-3 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-700">
                          {discount.label} ({discount.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Fabric Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('fabric')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Fabric</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.fabric ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.fabric && (
                  <div className="px-4 pb-4 space-y-2">
                    {fabricOptions.map(fabric => (
                      <label key={fabric.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.fabric.includes(fabric.value)}
                          onChange={() => handleFilterChange('fabric', fabric.value)}
                          className="mr-3 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-700">{fabric.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Neckline Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('neckline')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Neckline</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.neckline ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.neckline && (
                  <div className="px-4 pb-4 space-y-2">
                    {necklineOptions.map(neckline => (
                      <label key={neckline.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.neckline.includes(neckline.value)}
                          onChange={() => handleFilterChange('neckline', neckline.value)}
                          className="mr-3 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-700">{neckline.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sleeve Type Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('sleeveType')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">Sleeve Type</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${expandedSections.sleeveType ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.sleeveType && (
                  <div className="px-4 pb-4 space-y-2">
                    {sleeveTypeOptions.map(sleeve => (
                      <label key={sleeve.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.sleeveType.includes(sleeve.value)}
                          onChange={() => handleFilterChange('sleeveType', sleeve.value)}
                          className="mr-3 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-700">{sleeve.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer with View Results Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setIsFilterSidebarOpen(false)}
                className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                VIEW RESULTS
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isFilterSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsFilterSidebarOpen(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden w-full max-w-sm mx-auto"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] overflow-hidden flex items-center justify-center bg-gray-200">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : (
                  <i className="fa-solid fa-image text-4xl text-gray-400"></i>
                )}
                {/* Fallback placeholder icon (hidden by default, shown only if image fails to load) */}
                <i className="fa-solid fa-image text-4xl text-gray-400 hidden"></i>
                
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{product.discount}%
                  </div>
                )}

                {/* View Product Button - Pops up from bottom on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <button 
                      className="w-full bg-white text-gray-900 py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Star Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                {!isInCart(product.id) ? (
                  <div className="flex gap-2">
                    <button 
                      className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product.id);
                        }
                      }}
                    >
                      <svg 
                        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                        viewBox="0 0 24 24"
                        strokeWidth={isInWishlist(product.id) ? 0 : 2}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      <span className="text-base font-medium">
                        {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                      </span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="flex-1 border border-blue-200 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
                    >
                      Add to Cart <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <span className="text-sm font-medium text-gray-700">In Cart:</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCartQuantity(product, -1);
                          }}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600 font-medium">−</span>
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">
                          {getCartQuantity(product.id)}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCartQuantity(product, 1);
                          }}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600 font-medium">+</span>
                        </button>
                      </div>
                    </div>
                    {/* Wishlist Button */}
                    <button 
                      className={`flex items-center gap-2 w-full border py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : 'border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product.id);
                        }
                      }}
                    >
                      <svg 
                        className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                        viewBox="0 0 24 24"
                        strokeWidth={isInWishlist(product.id) ? 0 : 2}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-1">
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-pink-100 text-pink-600 border border-pink-300'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              {/* Next Button */}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 ml-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Feature Tabs Section - Replaces Price List Tables */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Headers */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-2xl border-2 border-gray-300 p-3 bg-gray-100">
              <button
                className={`px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  activeTab === 'new-arrival'
                    ? 'bg-white text-pink-600 shadow-lg'
                    : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setActiveTab('new-arrival')}
              >
                NEW ARRIVAL
              </button>
              <button
                className={`px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  activeTab === 'best-seller'
                    ? 'bg-white text-pink-600 shadow-lg'
                    : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setActiveTab('best-seller')}
              >
                BEST SELLER
              </button>
              <button
                className={`px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  activeTab === 'top-products'
                    ? 'bg-white text-pink-600 shadow-lg'
                    : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setActiveTab('top-products')}
              >
                TOP PRODUCTS
              </button>
            </div>
          </div>

          {/* Tab Content - List Format */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* NEW ARRIVAL Products - List Format */}
            {activeTab === 'new-arrival' && (
              <div className="divide-y divide-gray-100">
                {newArrivalProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Product Image */}
                    <div 
                      className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : (
                        <i className="fa-solid fa-image text-2xl text-gray-400 flex items-center justify-center h-full"></i>
                      )}
                      <i className="fa-solid fa-image text-2xl text-gray-400 hidden flex items-center justify-center h-full"></i>
                    </div>

                    {/* Product Info */}
                    <div 
                      className="flex-grow cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                      {!isInCart(product.id) ? (
                        <>
                          <button 
                            className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product.id);
                              }
                            }}
                          >
                            <svg 
                              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                              strokeWidth={isInWishlist(product.id) ? 0 : 2}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            <span className="text-base font-medium">
                              {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                            </span>
                          </button>
                          <button 
                            className="flex items-center gap-2 px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-base font-medium">Add to Cart</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button 
                            className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product.id);
                              }
                            }}
                          >
                            <svg 
                              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                              strokeWidth={isInWishlist(product.id) ? 0 : 2}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            <span className="text-base font-medium">
                              {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                            </span>
                          </button>
                          <div className="flex items-center gap-3 px-5 py-3 bg-gray-100 rounded-lg">
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product, -1);
                              }}
                            >
                              <span className="text-base font-bold">−</span>
                            </button>
                            <span className="text-base font-medium w-8 text-center">
                              {getCartQuantity(product.id)}
                            </span>
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product, 1);
                              }}
                            >
                              <span className="text-base font-bold">+</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div 
                      className="flex-shrink-0 text-gray-400 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BEST SELLER Products - List Format */}
            {activeTab === 'best-seller' && (
              <div className="divide-y divide-gray-100">
                {bestSellerProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Product Image */}
                    <div 
                      className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : (
                        <i className="fa-solid fa-image text-2xl text-gray-400 flex items-center justify-center h-full"></i>
                      )}
                      <i className="fa-solid fa-image text-2xl text-gray-400 hidden flex items-center justify-center h-full"></i>
                    </div>

                    {/* Product Info */}
                    <div 
                      className="flex-grow cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                      {!isInCart(product.id) ? (
                        <>
                          <button 
                            className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product.id);
                              }
                            }}
                          >
                            <svg 
                              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                              strokeWidth={isInWishlist(product.id) ? 0 : 2}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            <span className="text-base font-medium">
                              {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                            </span>
                          </button>
                          <button 
                            className="flex items-center gap-2 px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-base font-medium">Add to Cart</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button 
                            className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product.id);
                              }
                            }}
                          >
                            <svg 
                              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                              strokeWidth={isInWishlist(product.id) ? 0 : 2}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            <span className="text-base font-medium">
                              {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                            </span>
                          </button>
                          <div className="flex items-center gap-3 px-5 py-3 bg-gray-100 rounded-lg">
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product, -1);
                              }}
                            >
                              <span className="text-base font-bold">−</span>
                            </button>
                            <span className="text-base font-medium w-8 text-center">
                              {getCartQuantity(product.id)}
                            </span>
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product, 1);
                              }}
                            >
                              <span className="text-base font-bold">+</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div 
                      className="flex-shrink-0 text-gray-400 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TOP PRODUCTS - List Format */}
            {activeTab === 'top-products' && (
              <div className="divide-y divide-gray-100">
                {topProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Product Image */}
                    <div 
                      className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : (
                        <i className="fa-solid fa-image text-2xl text-gray-400 flex items-center justify-center h-full"></i>
                      )}
                      <i className="fa-solid fa-image text-2xl text-gray-400 hidden flex items-center justify-center h-full"></i>
                    </div>

                    {/* Product Info */}
                    <div 
                      className="flex-grow cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-base text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
                            {product.discount}% off
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                      {!isInCart(product.id) ? (
                        <>
                          <button 
                            className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product.id);
                              }
                            }}
                          >
                            <svg 
                              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                              strokeWidth={isInWishlist(product.id) ? 0 : 2}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            <span className="text-base font-medium">
                              {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                            </span>
                          </button>
                          <button 
                            className="flex items-center gap-2 px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-base font-medium">Add to Cart</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button 
                            className={`flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isInWishlist(product.id) ? 'bg-pink-500 text-white border-pink-500' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                              } else {
                                addToWishlist(product.id);
                              }
                            }}
                          >
                            <svg 
                              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'stroke-current fill-none'}`} 
                              viewBox="0 0 24 24"
                              strokeWidth={isInWishlist(product.id) ? 0 : 2}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                              />
                            </svg>
                            <span className="text-base font-medium">
                              {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                            </span>
                          </button>
                          <div className="flex items-center gap-3 px-5 py-3 bg-gray-100 rounded-lg">
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product, -1);
                              }}
                            >
                              <span className="text-base font-bold">−</span>
                            </button>
                            <span className="text-base font-medium w-8 text-center">
                              {getCartQuantity(product.id)}
                            </span>
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product, 1);
                              }}
                            >
                              <span className="text-base font-bold">+</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div 
                      className="flex-shrink-0 text-gray-400 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;