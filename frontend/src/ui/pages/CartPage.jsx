import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CartPage(){
  const [cartItems, setCartItems] = useState([])
  const [promoCode, setPromoCode] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    // Update cart count in header
    const count = cartItems.reduce((total, item) => total + item.quantity, 0)
    const cartCountElements = document.querySelectorAll('.cart-count')
    cartCountElements.forEach(element => {
      element.textContent = count
    })
  }, [cartItems])

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Remove item
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Apply promo code
  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'ETHNIC20': 20,
      'FIRST25': 25
    }
    
    if (validCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(validCodes[promoCode.toUpperCase()])
      setIsPromoApplied(true)
    } else {
      alert('Invalid promo code! Try: SAVE10, WELCOME15, ETHNIC20, FIRST25')
    }
  }

  // Remove promo code
  const removePromoCode = () => {
    setPromoDiscount(0)
    setIsPromoApplied(false)
    setPromoCode('')
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = (subtotal * promoDiscount) / 100
  const shipping = subtotal > 999 ? 0 : 99 // Free shipping over ₹999
  const tax = (subtotal - discountAmount) * 0.18 // 18% GST
  const total = subtotal - discountAmount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-golden-50 via-golden-100 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="w-32 h-32 bg-golden-gradient rounded-full flex items-center justify-center shadow-golden animate-pulse">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5m-15.5 0L5.4 5M7 13h10M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-golden-gradient rounded-full flex items-center justify-center shadow-golden">
                <span className="text-white text-lg font-bold">0</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-brand-primary mb-6">
              ✨ Your Cart is Empty ✨
            </h1>
            <p className="text-xl text-golden-700 mb-8 max-w-2xl mx-auto font-medium">
              Discover our amazing collection of ethnic wear and add your favorite golden pieces to get started on your luxurious shopping journey!
            </p>
            <div className="space-y-6">
              <Link 
                to="/shop" 
                className="golden-btn text-lg px-10 py-4 shadow-golden-lg transform hover:scale-105"
              >
                <i className="fa fa-shopping-bag mr-3 text-xl"></i>
                Start Shopping Now
              </Link>
              <div className="flex items-center justify-center gap-6 text-sm text-golden-600">
                <div className="flex items-center gap-2">
                  <i className="fa fa-truck text-brand-secondary"></i>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa fa-shield text-brand-secondary"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa fa-undo text-brand-secondary"></i>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-golden-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-golden-gradient rounded-full flex items-center justify-center shadow-golden">
              <i className="fa fa-shopping-cart text-white text-xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-brand-primary">
              ✨ Shopping Cart ✨
            </h1>
          </div>
          <p className="text-golden-700 font-medium">
            You have <span className="font-bold text-brand-secondary">{cartItems.length}</span> {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="golden-card shadow-golden-lg overflow-hidden">
              {/* Header with Gradient */}
              <div className="bg-golden-gradient px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <i className="fa fa-list"></i>
                    Cart Items
                  </h2>
                  <button 
                    onClick={clearCart}
                    className="text-white hover:text-golden-200 text-sm font-medium bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-200"
                  >
                    <i className="fa fa-trash mr-1"></i>
                    Clear All
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-600">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Category: {item.category}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mx-6">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600 font-medium">−</span>
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600 font-medium">+</span>
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900 mb-2">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6">
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      disabled={isPromoApplied}
                    />
                    {!isPromoApplied ? (
                      <button
                        onClick={applyPromoCode}
                        className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-colors"
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        onClick={removePromoCode}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {isPromoApplied && (
                    <p className="text-green-600 text-sm mt-1">
                      ✓ {promoDiscount}% discount applied!
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({promoDiscount}%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST 18%)</span>
                    <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{Math.round(total).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 999 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="w-full mt-6 bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <Link 
                  to="/shop" 
                  className="block w-full mt-3 text-center py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


