import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation, useScrollAnimationSingle } from '../../hooks/useScrollAnimation'

// Removed bannerImages array since we're removing all images

// Removed watchVideos array since we're removing all images

// Removed newArrivalImages array since we're removing all images

// Removed categories array since we're removing all images

// Removed products array since we're removing all images

export default function HomePage() {
  // Updated with new Google Drive images for frames 4-6
  const [current, setCurrent] = React.useState(0)
  const [categoryOffset, setCategoryOffset] = React.useState(0) // Carousel state
  const [shopCategoryOffset, setShopCategoryOffset] = React.useState(0) // Shop categories carousel state
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [currentX, setCurrentX] = React.useState(0)
  const [translateX, setTranslateX] = React.useState(0)
  const startXRef = React.useRef(0)
  const delta = React.useRef(0)
  const [imageError, setImageError] = React.useState({});
  const containerRef = React.useRef(null)
  
  // Categories data with images (4 total: only the main 4 categories)
  const categories = [
    // First 4 main categories only
    {label:'Royal aura', img:'https://drive.google.com/uc?export=download&id=1EPO-gsYJ8sy0biuAx2IhBsD5VUjUFV9X'},
    {label:'Everyday elegance', img:'/images/category2.jpg'},
    {label:'Threads loom', img:'/images/category3_updated.jpg'},
    {label:'Handpaint love', img:'/images/category3.jpg'},
  ]
  
  // Scroll animation hooks for different sections
  const { addToRefs: addToCategoryRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 60 
  })
  const { addToRefs: addToArrivalRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 40 
  })
  const { addToRefs: addToVideoRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 50 
  })
  const { addToRefs: addToShopRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 80 
  })
  const { addToRefs: addToTrendingRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 30 
  })
  const { addToRefs: addToPromoRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 100 
  })
  const { addToRefs: addToInstaRefs } = useScrollAnimation({ 
    threshold: 0.2, 
    staggerDelay: 20 
  })
  
  // Section title animations
  const { elementRef: categoryTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })
  const { elementRef: arrivalTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })
  const { elementRef: videoTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })
  const { elementRef: shopTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })
  const { elementRef: trendingTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })
  const { elementRef: promoTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })
  const { elementRef: instaTitleRef } = useScrollAnimationSingle({ threshold: 0.2 })

  React.useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % 5), 4500) // Changed to 5 since we removed banner images
    return () => clearInterval(t)
  }, [])

  // Category carousel navigation functions with touch support
  const maxOffset = 0; // No scrolling needed with only 4 categories
  const categoryWidth = 100 / 4; // Each category takes this percentage
  
  const nextCategory = () => {
    if (categoryOffset < maxOffset) {
      setCategoryOffset(prev => prev + 1)
      setTranslateX(-(categoryOffset + 1) * categoryWidth)
    }
  }

  const prevCategory = () => {
    if (categoryOffset > 0) {
      setCategoryOffset(prev => prev - 1)
      setTranslateX(-(categoryOffset - 1) * categoryWidth)
    }
  }
  
  // Touch/Mouse handlers for manual sliding
  const handleStart = (clientX) => {
    setIsDragging(true)
    setStartX(clientX)
    setCurrentX(clientX)
    startXRef.current = clientX
  }
  
  const handleMove = (clientX) => {
    if (!isDragging) return
    
    const deltaX = clientX - startX
    const maxTranslate = categoryWidth * maxOffset
    const currentTranslate = -(categoryOffset * categoryWidth) + (deltaX / window.innerWidth) * 100
    
    // Limit the translation within bounds
    const newTranslate = Math.max(-maxTranslate, Math.min(0, currentTranslate))
    setTranslateX(newTranslate)
    setCurrentX(clientX)
  }
  
  const handleEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    const deltaX = currentX - startX
    const threshold = 50 // Minimum distance to trigger slide
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && categoryOffset > 0) {
        // Swiped right - go to previous
        prevCategory()
      } else if (deltaX < 0 && categoryOffset < maxOffset) {
        // Swiped left - go to next
        nextCategory()
      } else {
        // Snap back to current position
        setTranslateX(-(categoryOffset * categoryWidth))
      }
    } else {
      // Snap back to current position
      setTranslateX(-(categoryOffset * categoryWidth))
    }
  }
  
  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault()
    handleStart(e.clientX)
  }
  
  const handleMouseMove = (e) => {
    handleMove(e.clientX)
  }
  
  const handleMouseUp = () => {
    handleEnd()
  }
  
  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX)
  }
  
  const handleTouchMove = (e) => {
    e.preventDefault()
    handleMove(e.touches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    handleEnd()
  }
  
  // Add mouse event listeners
  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e)
      }
    }
    
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }
    
    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, currentX, startX, categoryOffset])
  
  // Initialize translate position
  React.useEffect(() => {
    setTranslateX(-(categoryOffset * categoryWidth))
  }, [])

  // Shop categories navigation functions
  const nextShopCategory = () => {
    setShopCategoryOffset(1); // Jump directly to show the 4th frame
  }

  const prevShopCategory = () => {
    setShopCategoryOffset(0); // Jump directly back to first position
  }

  return (
    <div>
      <section className="relative">
        <div className="h-[80vh] md:h-[90vh] overflow-hidden relative"
             onTouchStart={(e)=>{startX.current = e.touches[0].clientX}}
             onTouchMove={(e)=>{delta.current = e.touches[0].clientX - startX.current}}
             onTouchEnd={()=>{ if (delta.current > 40) setCurrent(c=> (c-1+5)%5); else if (delta.current < -40) setCurrent(c=> (c+1)%5); delta.current = 0 }}>
          {/* Removed banner images since we're removing all images */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
          <button aria-label="Prev" onClick={()=>setCurrent(c=> (c-1+5)%5)} className="hidden md:grid absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white/20 place-items-center anim-btn hover:scale-110"><i className="fa-solid fa-chevron-left"></i></button>
          <button aria-label="Next" onClick={()=>setCurrent(c=> (c+1)%5)} className="hidden md:grid absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white/20 place-items-center anim-btn hover:scale-110"><i className="fa-solid fa-chevron-right"></i></button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">{[...Array(5)].map((_,i)=> (<button key={i} onClick={()=>setCurrent(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i===current? 'bg-golden-400 shadow-golden scale-125' : 'bg-white/70 hover:bg-white'}`}></button>))}</div>
          
          {/* Hero Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-center z-10">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
               
              </h1>
            
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Carousel with Enhanced Animations */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-golden-50 to-white overflow-visible">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-800 dark:text-golden-300">
            PRODUCT CATEGORIES
          </h2>
        </div>
        <div className="relative overflow-visible">
          <div className="overflow-hidden py-8" ref={containerRef}>
            <div 
              className="flex items-start gap-32 md:gap-36 px-6 md:px-10 lg:px-16 transition-transform duration-300 ease-out transform-gpu will-change-transform cursor-grab active:cursor-grabbing"
              style={{
                transform: `translate3d(${translateX}%, 0, 0)`,
                width: '100%' // Width adjusted for 4 categories
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* All 4 categories with touch slider support */}
              {categories.map((category, index) => (
                <div 
                  key={`category-${index}`}
                  className="snap-start min-w-[180px] md:min-w-[220px] flex flex-col items-center group relative z-10 flex-shrink-0 select-none"
                >
                  <div className="category-circle w-40 h-40 md:w-52 md:h-52 rounded-full ring-2 ring-golden-300 hover:ring-4 hover:ring-brand-primary transform hover:scale-105 hover:-translate-y-2 transition-all duration-150 ease-out shadow-golden hover:shadow-glossy relative z-10 bg-gray-100 overflow-hidden">
                    {/* Display category image if available and loaded successfully, otherwise show placeholder */}
                    {category.img && !imageError[`category-${index}`] ? (
                      <img 
                        src={category.img} 
                        alt={category.label}
                        className="w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        onError={(e) => {
                          console.error(`Failed to load image for category ${index}:`, category.img);
                          setImageError(prev => ({ ...prev, [`category-${index}`]: true }));
                        }}
                        onLoad={() => {
                          console.log(`Successfully loaded image for category ${index}:`, category.img);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        {index === 0 ? (
                          // Default image for the first category
                          <img 
                            src="https://drive.google.com/uc?export=download&id=1EPO-gsYJ8sy0biuAx2IhBsD5VUjUFV9X" 
                            alt="Default product"
                            className="w-3/4 h-3/4 object-contain"
                          />
                        ) : (
                          // Icon fallback for other categories
                          <i className="fa-solid fa-image text-4xl"></i>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-sm md:text-base transition-all duration-150 group-hover:text-brand-primary group-hover:font-bold group-hover:scale-105 group-hover:-translate-y-1 relative z-10 text-gray-700 dark:text-golden-300 font-medium">{category.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* New Arrival block with Enhanced Animations */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-50">
        <h2 className="text-center text-3xl md:text-4xl font-bold tracking-wide mb-6 text-gray-800 dark:text-golden-300">
          NEW ARRIVAL
        </h2>
        <div className="px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Removed newArrivalImages.map since we're removing all images */}
          {[...Array(8)].map((_, idx)=> {
            const productNames = [
              'Elegant Red Dress',
              'Floral Print Kurti',
              'Designer Anarkali',
              'Silk Saree',
              'Cotton Lehenga',
              'Embroidered Suit',
              'Party Wear Gown',
              'Traditional Outfit'
            ];
            
            return (
              <div 
                key={idx} 
                ref={addToArrivalRefs}
                className="scroll-animate-left arrival-card rounded-2xl overflow-hidden golden-card transform hover:scale-105 hover:-translate-y-3 hover:rotate-1 hover:shadow-glossy hover:border-brand-primary cursor-pointer transition-all duration-500 ease-out"
              >
                <div className="relative overflow-hidden">
                  {/* Removed image element since we're removing all images */}
                  <div className="w-full h-72 sm:h-80 md:h-[420px] bg-gray-200 flex items-center justify-center">
                    <i className="fa-solid fa-image text-4xl text-gray-400"></i>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-golden-400/20 to-transparent opacity-0 hover:opacity-100 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-glossy-gold rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 transform scale-0 hover:scale-100">
                    <i className="fa-solid fa-heart text-white text-sm"></i>
                  </div>
                  {/* Product name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">{productNames[idx]}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-8 md:px-16 mt-8 flex justify-center">
          <Link to="/shop" className="golden-btn tracking-wide text-lg px-8 py-4 hover:scale-110 hover:shadow-glossy animate-pulse3d">VIEW ALL COLLECTION</Link>
        </div>
      </section>

      {/* Watch and Buy block (videos) - same layout as NEW ARRIVAL */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 className="text-center text-3xl md:text-4xl font-bold tracking-wide mb-6 text-gray-800 dark:text-golden-300">
          Watch & BUY
        </h2>
        <div className="px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Removed watchVideos.map since we're removing all images/videos */}
          {[...Array(4)].map((_, idx)=> {
            const videoNames = [
              'Blue Co-ord Set',
              'Mustard Ethnic',
              'Anarkali Collection',
              'Red Traditional'
            ];
            
            return (
              <div 
                key={idx} 
                ref={addToVideoRefs}
                className="scroll-animate-right group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  {/* Removed video element since we're removing all images/videos */}
                  <div className="w-full h-72 sm:h-80 md:h-[420px] bg-gray-200 flex items-center justify-center">
                    <i className="fa-solid fa-video text-4xl text-gray-400"></i>
                  </div>
                  {/* Video name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                      <h3 className="text-sm md:text-base font-semibold text-white truncate">{videoNames[idx]}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-medium truncate transition-colors duration-300 group-hover:text-brand-primary">Sample Product Title</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="font-bold transition-colors duration-300 group-hover:text-brand-secondary">₹1,999</div>
                    <div className="text-gray-500 line-through text-sm">₹2,999</div>
                  </div>
                  <div className="inline-block mt-2 text-xs bg-golden-gradient text-white rounded px-3 py-1 transition-all duration-300 group-hover:shadow-md">30% off</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shop by Categories (3 large frames) */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-50">
        <h2 
          ref={shopTitleRef}
          className="scroll-animate text-center text-2xl md:text-3xl font-bold tracking-wide mb-6 text-gray-800 dark:text-golden-300"
          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}
        >
          SHOP BY CATEGORIES
        </h2>
        <div className="relative px-4 md:px-10 lg:px-16">
          <button aria-label="Prev" className="hidden md:grid absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center" onClick={prevShopCategory}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${shopCategoryOffset * 33.33}%)`,
                width: '133.33%' // Width to accommodate 4 items when showing 3
              }}
            >
              {[
                {label:'Kurta Set', img:''},
                {label:'Anarkali Set', img:''},
                {label:'Co-Ords', img:''},
                {label:'Lehenga Set', img:''}
              ].map((c, index)=> (
                <div 
                  key={c.label} 
                  ref={addToShopRefs}
                  className="scroll-animate-scale group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg cursor-pointer overflow-hidden flex-shrink-0"
                  style={{ width: 'calc(33.33% - 20px)', marginRight: '30px' }}
                >
                  <div className="rounded-2xl overflow-hidden">
                    {/* Removed image element since we're removing all images */}
                    <div className="w-full h-[360px] sm:h-[420px] md:h-[520px] bg-gray-200 flex items-center justify-center">
                      <i className="fa-solid fa-image text-4xl text-gray-400"></i>
                    </div>
                  </div>
                  <div className="mt-4 text-center font-bold transition-all duration-300 group-hover:text-brand-primary text-lg text-gray-700 dark:text-golden-300">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
          <button aria-label="Next" className="hidden md:grid absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center" onClick={nextShopCategory}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* NEW BORN showcase (8 items) */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 
          ref={trendingTitleRef}
          className="scroll-animate text-center text-3xl md:text-4xl font-bold tracking-wide mb-8 text-gray-800 dark:text-golden-300"
          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}
        >
          Trending Products
        </h2>
        <div className="px-4 md:px-10 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {/* Removed products.map since we're removing all images */}
          {[...Array(8)].map((_, i)=> (
            <div 
              key={i} 
              ref={addToTrendingRefs}
              className="scroll-animate golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer group overflow-hidden"
            >
              {/* Removed image element since we're removing all images */}
              <div className="w-full h-80 md:h-96 bg-gray-200 flex items-center justify-center">
                <i className="fa-solid fa-image text-4xl text-gray-400"></i>
              </div>
              <div className="p-4">
                <div className="text-sm md:text-base font-medium line-clamp-2 transition-colors duration-300 group-hover:text-brand-primary">Sample Product Title</div>
                <div className="mt-2 text-brand-secondary font-bold text-sm md:text-base transition-colors duration-300 group-hover:text-brand-primary">Rs. 1,999.00</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional trio block with enhanced glossy effects */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-glossy-shine opacity-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-10 lg:px-16 relative z-10">
          {[
            {title:'NEW ARRIVAL', cta:'SHOP NOW', img:''},
            {title:'BEST SELLER', cta:'EXPLORE COLLECTION', img:''},
            {title:'TOP PRODUCTS', cta:'EXPLORE COLLECTION', img:''}
          ].map((item, index)=> (
            <div 
              key={item.title} 
              ref={addToPromoRefs}
              className="scroll-animate-rotate relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-glossy cursor-pointer border-2 border-golden-200 hover:border-golden-400"
            >
              {/* Removed image element since we're removing all images */}
              <div className="w-full h-[360px] sm:h-[420px] md:h-[520px] bg-gray-200 flex items-center justify-center">
                <i className="fa-solid fa-image text-4xl text-gray-400"></i>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-golden-900/70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <div className="text-2xl md:text-4xl font-bold tracking-wide mb-6 drop-shadow-lg transition-all duration-300 group-hover:text-golden-200" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.7)'}}>{item.title}</div>
                <button className="golden-btn text-xs md:text-sm tracking-widest border-2 border-golden-300 bg-glossy-gold/90 hover:bg-glossy-gold transition-all duration-300 shadow-glossy hover:shadow-golden-lg">{item.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram-style feed */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 
          ref={instaTitleRef}
          className="scroll-animate px-4 md:px-10 lg:px-16 text-center text-2xl md:text-3xl font-bold tracking-wide mb-8 text-gray-800 dark:text-golden-300"
          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}
        >
          WHAT'S ON OUR INSTA FEED
        </h2>
        <div className="px-4 md:px-10 lg:px-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
          {/* Removed insta feed items since we're removing all images */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              ref={addToInstaRefs}
              className="scroll-animate-scale rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden cursor-pointer border-2 border-transparent hover:border-brand-primary"
            >
              {/* Removed image/video element since we're removing all images */}
              <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
                <i className="fa-solid fa-image text-2xl text-gray-400"></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Removed legacy Shop by Category, About, and bottom New Arrivals sections */}
    </div>
  )
}