import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cartService } from '../../services/cart.js'

export default function CartPage(){
  const [cartItems, setCartItems] = useState([])
  const [promoCode, setPromoCode] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = cartService.getCart()
        console.log('CartPage: Loading cart on mount:', cart) // Debug log
        console.log('CartPage: Cart count:', cartService.getCartCount()) // Debug log
        setCartItems(cart)
      } catch (error) {
        console.error('Error loading cart:', error)
        setCartItems([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      console.log('CartPage: Received cart update event') // Debug log
      loadCart()
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  // Sync cartItems changes back to cartService (but avoid infinite loops)
  useEffect(() => {
    if (!isLoading && cartItems.length >= 0) {
      try {
        // Only sync if the cart has actually changed from what's in cartService
        const currentCart = cartService.getCart()
        const cartChanged = JSON.stringify(currentCart) !== JSON.stringify(cartItems)
        
        if (cartChanged) {
          localStorage.setItem('cart', JSON.stringify(cartItems))
          cartService.updateCartCount()
          // Dispatch event to notify other components
          window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: cartService.getCartCount() } }))
        }
      } catch (error) {
        console.error('Error saving cart:', error)
      }
    }
  }, [cartItems, isLoading])

  // Update quantity using cartService
  const updateQuantity = (id, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        removeItem(id)
        return
      }
      
      // Use cartService to update the item
      cartService.updateCartItem(id, newQuantity)
      
      // Update local state to reflect the change
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  // Remove item using cartService
  const removeItem = (id) => {
    try {
      // Use cartService to remove the item
      cartService.removeFromCart(id)
      
      // Update local state to reflect the change
      setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  // Clear cart using cartService
  const clearCart = () => {
    try {
      // Use cartService to clear the cart
      cartService.clearCart()
      
      // Update local state to reflect the change
      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
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
              <div className="w-32 h-32 bg-glossy-gold rounded-full flex items-center justify-center shadow-glossy animate-pulse border-4 border-golden-300">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5m-15.5 0L5.4 5M7 13h10M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-glossy-gold rounded-full flex items-center justify-center shadow-glossy border-2 border-golden-200">
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
                className="golden-btn text-lg px-10 py-4 shadow-glossy transform hover:scale-105 hover:shadow-golden-lg bg-glossy-gold border-2 border-golden-300"
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{cartItems.length} items in your cart</p>
          </div>
          <Link 
            to="/shop" 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <i className="fa fa-arrow-left mr-2"></i>
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Header */}
              <div className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.category || 'M-Well'} • {item.subcategory || 'Daily Essentials'}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                            ⚠ Maximum quantity reached (10)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 line-through text-sm">
                            ₹{((item.price * 1.25) || item.originalPrice || (item.price + 200)).toLocaleString('en-IN')}
                          </span>
                          <span className="text-green-600 font-semibold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-green-600 text-sm">-{Math.round(((item.originalPrice || (item.price + 200)) - item.price) / (item.originalPrice || (item.price + 200)) * 100)}%</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600 font-medium text-lg">−</span>
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-600 font-medium text-lg">+</span>
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-gray-900 text-lg mb-2">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <i className="fa fa-trash text-sm"></i>
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
            <div className="bg-white rounded-lg shadow-sm border sticky top-8">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6">
                {/* Mini cart items preview */}
                <div className="space-y-3 mb-6">
                  {cartItems.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apply Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter Coupon code here"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      disabled={isPromoApplied}
                    />
                    {!isPromoApplied ? (
                      <button
                        onClick={applyPromoCode}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        onClick={removePromoCode}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
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
                  {!isPromoApplied && (
                    <p className="text-blue-600 text-sm mt-1 cursor-pointer hover:underline">
                      Clear coupon
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18%)</span>
                    <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Handling Charges</span>
                    <span>₹{shipping}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({promoDiscount}%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{Math.round(total).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* SSL Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <i className="fa fa-lock"></i>
                  <span>Secure Checkout with 128-bit SSL</span>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded font-semibold hover:bg-green-700 transition-colors text-lg">
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button 
                  onClick={() => window.location.href = '/shop'}
                  className="w-full mt-3 py-3 px-4 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


