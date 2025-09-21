// ... existing code ...
const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Use a default image path if the product image is missing
  const imagePath = product.image && product.image.trim() !== '' 
    ? `/images/${product.image}` 
    : '/default-product-image.svg';

  return (
    <div className="product-card">
      <img 
        src={imageError ? '/default-product-image.svg' : imagePath} 
        alt={product.name}
        onError={handleImageError}
        className="product-image"
      />
      <div className="product-name">{product.name}</div>
    </div>
  );
};

// ... existing code ...{
  "products": [
    {
      "id": 1,
      "name": "Elegant Red Dress",
      "image": "elegant-red-dress.jpg",
      "price": 899,
      "category": "Dresses"
    },
    {
      "id": 2,
      "name": "Floral Print Kurti",
      "image": "floral-print-kurti.jpg",
      "price": 599,
      "category": "Kurtis"
    },
    {
      "id": 3,
      "name": "Designer Anarkali",
      "image": "designer-anarkali.jpg",
      "price": 1299,
      "category": "Anarkalis"
    },
    {
      "id": 4,
      "name": "Silk Saree",
      "image": "silk-saree.jpg",
      "price": 1499,
      "category": "Sarees"
    },
    {
      "id": 5,
      "name": "Cotton Lehenga",
      "image": "cotton-lehenga.jpg",
      "price": 999,
      "category": "Lehengas"
    },
    {
      "id": 6,
      "name": "Embroidered Suit",
      "image": "embroidered-suit.jpg",
      "price": 799,
      "category": "Suits"
    },
    {
      "id": 7,
      "name": "Party Wear Gown",
      "image": "party-wear-gown.jpg",
      "price": 1199,
      "category": "Gowns"
    },
    {
      "id": 8,
      "name": "Traditional Outfit",
      "image": "traditional-outfit.jpg",
      "price": 699,
      "category": "Traditional"
    }
  ]
}{
  "products": [
    {
      "id": 1,
      "name": "Elegant Red Dress",
     // ... existing code ...
import { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products data
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    // Ensure we have a valid image path
    const imagePath = product.image && product.image.trim() !== '' 
      ? `/images/${product.image}` 
      : '/default-product-image.svg';

    return (
      <div className="product-card">
        <img 
          src={imageError ? '/default-product-image.svg' : imagePath} 
          alt={product.name}
          onError={handleImageError}
          className="product-image"
        />
        <div className="product-name">{product.name}</div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero content */}
      </section>

      {/* New Arrival Section */}
      <section className="new-arrival-section">
        <h2>NEW ARRIVAL</h2>
        <div className="products-grid">
          {products.slice(0, 7).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button className="view-all-button">VIEW ALL COLLECTION</button>
      </section>
    </div>
  );
};

export default HomePage;#!/bin/bash

echo "🚀 Golden Elegance Deployment Status Checker"
echo "============================================"
echo ""

echo "✅ Checking deployment files..."

# Check if .nojekyll exists
if [ -f ".nojekyll" ]; then
    echo "✅ .nojekyll file exists (Jekyll disabled)"
else
    echo "❌ .nojekyll file missing"
fi

# Check if GitHub workflow exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions workflow exists"
else
    echo "❌ GitHub Actions workflow missing"
fi

# Check if gitignore excludes node_modules
if grep -q "node_modules/" ".gitignore"; then
    echo "✅ node_modules properly ignored"
else
    echo "❌ node_modules not ignored"
fi

# Check vite config
if grep -q "First-Attempt" "frontend/vite.config.js"; then
    echo "✅ Vite base path configured correctly"
else
    echo "❌ Vite base path needs configuration"
fi

echo ""
echo "📋 Manual Steps Required:"
echo "1. Go to: https://github.com/girish457/First-Attempt/settings/pages"
echo "2. Change 'Source' to 'GitHub Actions'"
echo "3. Wait 2-3 minutes for deployment"
echo "4. Visit: https://girish457.github.io/First-Attempt/"
echo ""
echo "🎯 Expected Result: Golden Elegance e-commerce site with working animations and dark mode"