import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useScrollAnimation, useScrollAnimationSingle } from '../../hooks/useScrollAnimation'

// Removed bannerImages array since we're removing all images

// Removed watchVideos array since we're removing all images

// Removed newArrivalImages array since we're removing all images

// Removed categories array since we're removing all images

// Removed products array since we're removing all images

export default function HomePage() {
  const navigate = useNavigate();
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
    {label:'Royal aura', img:'https://i.postimg.cc/cJMJSPsm/generated-images-016.png', category: 'ethnic-woman'},
    {label:'Everyday elegance', img:'https://i.postimg.cc/wB0dFzqS/generated-image-1.png', category: 'child-girl'},
    {label:'Threads loom', img:'https://i.postimg.cc/NMdfyT22/generated-images-017.png', category: 'child-boy'},
    {label:'Handpaint love', img:'https://i.postimg.cc/0jLvmCkj/generated-image-03.png', category: 'handpaint-love'},
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

  // State for video carousel
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0)
  
  // Video data for carousel (8 videos total)
  const videos = [
    { 
      src: 'https://player.vimeo.com/video/1120563936',
      title: 'Ombre pink kurti with handpaint',
      price: '₹2,199',
      originalPrice: '₹2,499',
      discount: '36% off',
      productId: 1  // https://i.postimg.cc/0Q5TFBWh/AVP02939.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120564287',
      title: 'Yellow handpaint kurti set',
      price: '₹1,999',
      originalPrice: '₹4,999',
      discount: '28% off',
      productId: 4  // https://i.postimg.cc/4dZcgzVD/AVP02971.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120564518',
      title: 'Yellow color block design dress',
      price: '₹1,599',
      originalPrice: '₹6,999',
      discount: '34% off',
      productId: 7  // https://i.postimg.cc/RC2HC571/AVP03017.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120564696',
      title: 'nice kurti',
      price: '₹1,499',
      originalPrice: '₹2,199',
      discount: '32% off',
      productId: 21  // https://i.postimg.cc/d1rjwshf/AVP03233.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120786367',
      title: 'Green kurti with handpaint sleeves',
      price: '₹1,999',
      originalPrice: '₹3,299',
      discount: '30% off',
      productId: 13  // https://i.postimg.cc/qMXy1DK8/AVP03114.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120786407',
      title: 'Aqua blue hand paint kurti',
      price: '₹2,099',
      originalPrice: '₹2,799',
      discount: '32% off',
      productId: 14  // https://i.postimg.cc/jdZCWpNk/AVP03127.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120786313',
      title: 'Green plazzo kurti set',
      price: '₹1,699',
      originalPrice: '₹1,499',
      discount: '33% off',
      productId: 11  // https://i.postimg.cc/Vv009D8b/AVP03081.jpg
    },
    { 
      src: 'https://player.vimeo.com/video/1120786265',
      title: 'Purple handpaint kurti set',
      price: '₹2,199',
      originalPrice: '₹9,999',
      discount: '30% off',
      productId: 15  // https://i.postimg.cc/wMFxmNts/AVP03138.jpg
    }
  ]

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

  // Shop categories navigation functions with limit of 2 clicks
  const nextShopCategory = () => {
    if (shopCategoryOffset < 2) { // Limit to 2 clicks
      setShopCategoryOffset(prev => prev + 1);
    }
  }

  const prevShopCategory = () => {
    if (shopCategoryOffset > 0) {
      setShopCategoryOffset(prev => prev - 1);
    }
  }

  // Video carousel navigation functions
  const nextVideoSet = () => {
    setCurrentVideoIndex(prev => (prev === 0 ? 1 : 0))
  }

  const prevVideoSet = () => {
    setCurrentVideoIndex(prev => (prev === 0 ? 1 : 0))
  }

  // Function to navigate to shop page with category filter
  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    // Removed unnecessary div wrapper to reduce nesting and potential margin issues
    <div className="w-full">
      <section className="relative w-full">
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
                  onClick={() => handleCategoryClick(category.category)}
                >
                  <div className="category-circle w-40 h-40 md:w-52 md:h-52 rounded-full ring-2 ring-golden-300 hover:ring-4 hover:ring-brand-primary transition-all duration-150 ease-out shadow-golden hover:shadow-glossy relative z-10 bg-gray-100 overflow-hidden cursor-pointer">
                    {/* Display category image if available and loaded successfully, otherwise show placeholder */}
                    {category.img && !imageError[`category-${index}`] ? (
                      <img 
                        src={category.img} 
                        alt={category.label}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: 
                            index === 0 ? 'center 48%' : 
                            index === 1 ? 'center 10%' : 
                            index === 2 ? '45% 55%' : 
                            'center 40%',
                          transform: 
                            index === 0 ? 'scale(1.11)' : 
                            index === 1 ? 'scale(1.05)' : 
                            index === 2 ? 'scale(1.12)' : 
                            'scale(1.15)'
                        }}
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
                            src="https://i.postimg.cc/cJMJSPsm/generated-images-016.png" 
                            alt="Default product"
                            className="w-3/4 h-3/4 object-contain"
                            style={{
                              objectPosition: 'center 48%',
                              transform: 'scale(1.11)'
                            }}
                          />
                        ) : index === 1 ? (
                          // Fallback for second category
                          <img 
                            src="https://i.postimg.cc/wB0dFzqS/generated-image-1.png" 
                            alt="Default product"
                            className="w-3/4 h-3/4 object-contain"
                            style={{
                              objectPosition: 'center 10%',
                              transform: 'scale(1.05)'
                            }}
                          />
                        ) : index === 2 ? (
                          // Fallback for third category
                          <img 
                            src="https://i.postimg.cc/NMdfyT22/generated-images-017.png" 
                            alt="Default product"
                            className="w-3/4 h-3/4 object-contain"
                            style={{
                              objectPosition: '45% 55%',
                              transform: 'scale(1.12)'
                            }}
                          />
                        ) : (
                          // Fallback for fourth category
                          <img 
                            src="https://i.postimg.cc/0jLvmCkj/generated-image-03.png" 
                            alt="Default product"
                            className="w-3/4 h-3/4 object-contain"
                            style={{
                              objectPosition: 'center 40%',
                              transform: 'scale(1.15)'
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-sm md:text-base transition-all duration-150 group-hover:text-brand-primary group-hover:font-bold group-hover:scale-105 group-hover:-translate-y-1 relative z-10 text-gray-700 dark:text-golden-300 font-medium cursor-pointer">{category.label}</div>
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
          {/* New Arrival Images */}
          {[
            { 
              img: 'https://i.postimg.cc/Bvq0xb0T/generated-image01.png', 
              hoverImg: 'https://i.postimg.cc/5284BDFV/generated-image-10.png', // Frame 1 hover image
              name: 'Ombre pink kurti with handpaint',
              productId: 1 // Added product ID for navigation
            },
            { 
              img: 'https://i.postimg.cc/cJMJSPsm/generated-images-016.png', 
              hoverImg: 'https://i.postimg.cc/59GbZfBJ/generated-image-6.png', // Frame 2 hover image
              name: 'Beige midi dress',
              productId: 9 // https://i.postimg.cc/P5Sfx1GG/AVP03051.jpg
            },
            { 
              img: 'https://i.postimg.cc/dtbQTJ36/generated-image-011.png', 
              hoverImg: 'https://i.postimg.cc/wB0dFzqS/generated-image-1.png', // Frame 3 hover image
              name: 'Sky blue kurti set',
              productId: 2 // https://i.postimg.cc/JhSTcdwb/AVP02949.jpg
            },
            { 
              img: 'https://i.postimg.cc/j2WKL1rB/generated-image-04.png', 
              hoverImg: 'https://i.postimg.cc/J7pQwhY0/generated-image-2.png', // Frame 4 hover image
              name: 'nice kurti',
              productId: 21 // https://i.postimg.cc/d1rjwshf/AVP03233.jpg
            },
            { 
              img: 'https://i.postimg.cc/0jLvmCkj/generated-image-03.png', 
              hoverImg: 'https://i.postimg.cc/bNHSXVwT/generated-image-3.png', // Frame 5 hover image
              name: 'Purple handpaint kurti set',
              productId: 15 // https://i.postimg.cc/wMFxmNts/AVP03138.jpg
            },
            { 
              img: 'https://i.postimg.cc/FRCNF4wj/generated-image-05.png', 
              hoverImg: 'https://i.postimg.cc/SxM5N9HD/generated-image-4.png', // Frame 6 hover image
              name: 'Orange one piece dress',
              productId: 19 // https://i.postimg.cc/jjvMBdJ4/AVP03194.jpg
            },
            { 
              img: 'https://i.postimg.cc/HWPkdwCf/generated-image-014.png', 
              hoverImg: 'https://i.postimg.cc/NjvYjbCP/generated-image-4.png', // Frame 7 hover image
              name: 'Yellow handpaint kurti set',
              productId: 4 // https://i.postimg.cc/4dZcgzVD/AVP02971.jpg
            },
            { 
              img: 'https://i.postimg.cc/YSkpb81m/generated-image-012.png', 
              hoverImg: 'https://i.postimg.cc/MZ01xpsV/generated-image-6.png', // Frame 8 hover image
              name: 'Yellow color block design dress',
              productId: 7 // https://i.postimg.cc/RC2HC571/AVP03017.jpg
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              ref={addToArrivalRefs}
              className="scroll-animate-left arrival-card rounded-2xl overflow-hidden golden-card transform hover:scale-105 hover:-translate-y-3 hover:rotate-1 hover:shadow-glossy hover:border-brand-primary cursor-pointer transition-all duration-500 ease-out new-arrival-frame"
              onClick={() => {
                // Navigate to product detail page if productId exists, otherwise do nothing
                if (item.productId) {
                  navigate(`/product/${item.productId}`);
                }
              }}
            >
              <div className="relative overflow-hidden h-72 sm:h-80 md:h-[420px]">
                {/* Original Image */}
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out absolute inset-0 original-img"
                  style={{
                    objectPosition: 
                      idx === 0 ? 'center top' : 
                      idx === 1 ? 'center center' : 
                      idx === 2 ? 'center bottom' : 
                      idx === 3 ? 'center top' : 
                      idx === 4 ? 'center center' : 
                      idx === 5 ? 'center bottom' : 
                      idx === 6 ? 'center top' : 
                      'center center',
                  }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                {/* Hover Image */}
                <img 
                  src={item.hoverImg} 
                  alt={`${item.name} hover`}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out absolute inset-0 hover-img"
                  style={{
                    objectPosition: 
                      idx === 0 ? 'center top' : 
                      idx === 1 ? 'center center' : 
                      idx === 2 ? 'center bottom' : 
                      idx === 3 ? 'center top' : 
                      idx === 4 ? 'center center' : 
                      idx === 5 ? 'center bottom' : 
                      idx === 6 ? 'center top' : 
                      'center center',
                  }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-golden-400/20 to-transparent opacity-0 hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-glossy-gold rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 transform scale-0 hover:scale-100 z-10">
                  <i className="fa-solid fa-heart text-white text-sm"></i>
                </div>
                {/* Product name overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">{item.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-8 md:px-16 mt-8 flex justify-center">
          <Link to="/shop" className="golden-btn tracking-wide text-lg px-8 py-4 hover:scale-110 hover:shadow-glossy animate-pulse3d">VIEW ALL COLLECTION</Link>
        </div>
      </section>

      {/* Watch and Buy block (videos) - carousel layout */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 
          ref={videoTitleRef}
          className="scroll-animate text-center text-3xl md:text-4xl font-bold tracking-wide mb-6 text-gray-800 dark:text-golden-300"
        >
          Watch & BUY
        </h2>
        <div className="px-8 md:px-16 relative carousel-container">
          {/* Navigation arrows */}
          <button 
            onClick={prevVideoSet}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white/20 flex items-center justify-center hover:scale-110 hidden md:flex"
            aria-label="Previous videos"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextVideoSet}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white/20 flex items-center justify-center hover:scale-110 hidden md:flex"
            aria-label="Next videos"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          
          {/* Video carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out carousel-wrapper"
              style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
            >
              {/* First set of 4 videos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full flex-shrink-0 carousel-slide">
                {videos.slice(0, 4).map((video, idx) => (
                  <div 
                    key={idx} 
                    ref={addToVideoRefs}
                    className="scroll-animate-right group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer"
                    onClick={() => {
                      // Navigate to product detail page if productId exists
                      if (video.productId) {
                        navigate(`/product/${video.productId}`);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <div className="video-wrapper relative w-full overflow-hidden rounded-t-2xl bg-black" style={{ aspectRatio: '9/16' }}>
                        <iframe 
                          src={`${video.src}?autoplay=1&muted=1&loop=1&autopause=0&background=1&controls=0&quality=1080p&responsive=1`}
                          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          title={video.title}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      {/* Video name overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                          <h3 className="text-sm md:text-base font-semibold text-white truncate">{video.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-medium truncate transition-colors duration-300 group-hover:text-brand-primary">{video.title}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="font-bold transition-colors duration-300 group-hover:text-brand-secondary">{video.price}</div>
                        <div className="text-gray-500 line-through text-sm">{video.originalPrice}</div>
                      </div>
                      <div className="inline-block mt-2 text-xs bg-golden-gradient text-white rounded px-3 py-1 transition-all duration-300 group-hover:shadow-md">{video.discount}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second set of 4 videos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full flex-shrink-0 carousel-slide">
                {videos.slice(4, 8).map((video, idx) => (
                  <div 
                    key={idx + 4} 
                    ref={addToVideoRefs}
                    className="scroll-animate-right group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer"
                    onClick={() => {
                      // Navigate to product detail page if productId exists
                      if (video.productId) {
                        navigate(`/product/${video.productId}`);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <div className="video-wrapper relative w-full overflow-hidden rounded-t-2xl bg-black" style={{ aspectRatio: '9/16' }}>
                        <iframe 
                          src={`${video.src}?autoplay=1&muted=1&loop=1&autopause=0&background=1&controls=0&quality=1080p&responsive=1`}
                          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          title={video.title}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      {/* Video name overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                          <h3 className="text-sm md:text-base font-semibold text-white truncate">{video.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-medium truncate transition-colors duration-300 group-hover:text-brand-primary">{video.title}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="font-bold transition-colors duration-300 group-hover:text-brand-secondary">{video.price}</div>
                        <div className="text-gray-500 line-through text-sm">{video.originalPrice}</div>
                      </div>
                      <div className="inline-block mt-2 text-xs bg-golden-gradient text-white rounded px-3 py-1 transition-all duration-300 group-hover:shadow-md">{video.discount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Dots indicator for mobile */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex gap-2">
              {[0, 1].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentVideoIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentVideoIndex === idx 
                      ? 'bg-golden-400 shadow-golden scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to video set ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW BORN showcase (16 items) */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 
          ref={trendingTitleRef}
          className="scroll-animate text-center text-3xl md:text-4xl font-bold tracking-wide mb-8 text-gray-800 dark:text-golden-300"
          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}
        >
          Trending Products
        </h2>
        <div className="px-4 md:px-10 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {/* Updated to 16 items (4 rows of 4) with actual product images and hover effect */}
          {[
            { 
              img: 'https://i.postimg.cc/JhSTcdwb/AVP02949.jpg', 
              hoverImg: 'https://i.postimg.cc/fRkKwSgk/generated-image-24.png',
              title: 'Sky blue kurti set', 
              price: '₹1,999',
              originalPrice: '₹6,999',
              discount: '29% off',
              productId: 2
            },
            { 
              img: 'https://i.postimg.cc/Y2z3hSSN/AVP02960.jpg', 
              hoverImg: 'https://i.postimg.cc/L8pwyTyL/generated-image_(7).png',
              title: 'Lavender ombre kurti set', 
              price: '₹1,899',
              originalPrice: '₹3,999',
              discount: '28% off',
              productId: 3
            },
            { 
              img: 'https://i.postimg.cc/4dZcgzVD/AVP02971.jpg', 
              hoverImg: 'https://i.postimg.cc/NfTZ7VxQ/generated-image_(8).png',
              title: 'Yellow handpaint kurti set', 
              price: '₹1,999',
              originalPrice: '₹4,999',
              discount: '28% off',
              productId: 4
            },
            { 
              img: 'https://i.postimg.cc/mDbPqTGR/AVP02989.jpg', 
              hoverImg: 'https://i.postimg.cc/zGCpVYFR/generated-image_(21).png',
              title: 'A line plated kurti set', 
              price: '₹2,299',
              originalPrice: '₹8,999',
              discount: '33% off',
              productId: 5
            },
            { 
              img: 'https://i.postimg.cc/Px35RZ4z/AVP03001.jpg', 
              hoverImg: 'https://i.postimg.cc/9XD6zzRR/generated-image_(13).png',
              title: 'Plated kurti set', 
              price: '₹1,799',
              originalPrice: '₹2,699',
              discount: '30% off',
              productId: 6
            },
            { 
              img: 'https://i.postimg.cc/hGGjbp8P/AVP03031.jpg', 
              hoverImg: 'https://i.postimg.cc/5jcq2sH3/generated-image_(14).png',
              title: 'Designer kurti paint', 
              price: '₹2,299',
              originalPrice: '₹4,999',
              discount: '34% off',
              productId: 8
            },
            { 
              img: 'https://i.postimg.cc/Zq1SBcVQ/AVP03066.jpg', 
              hoverImg: 'https://i.postimg.cc/WzqwVB4z/generated-image_(15).png',
              title: 'A line kurti set', 
              price: '₹1,999',
              originalPrice: '₹2,499',
              discount: '28% off',
              productId: 10
            },
            { 
              img: 'https://i.postimg.cc/Vv009D8b/AVP03081.jpg', 
              hoverImg: 'https://i.postimg.cc/pXrGdSm2/generated-image-25.png',
              title: 'Green plazzo kurti set', 
              price: '₹1,699',
              originalPrice: '₹1,499',
              discount: '33% off',
              productId: 11
            },
            { 
              img: 'https://i.postimg.cc/d0W94HzW/AVP03096.jpg', 
              hoverImg: 'https://i.postimg.cc/vBNtpYbC/generated-image_(16).png',
              title: 'Lavender ombre kurti set', 
              price: '₹1,899',
              originalPrice: '₹1,199',
              discount: '33% off',
              productId: 12
            },
            { 
              img: 'https://i.postimg.cc/qMXy1DK8/AVP03114.jpg', 
              hoverImg: 'https://i.postimg.cc/266xcbR4/generated-image_(17).png',
              title: 'Green kurti with handpaint sleeves', 
              price: '₹1,999',
              originalPrice: '₹3,299',
              discount: '30% off',
              productId: 13
            },
            { 
              img: 'https://i.postimg.cc/jdZCWpNk/AVP03127.jpg', 
              hoverImg: 'https://i.postimg.cc/tgD5Ndfq/generated-image_(18).png',
              title: 'Aqua blue hand paint kurti', 
              price: '₹2,099',
              originalPrice: '₹2,799',
              discount: '32% off',
              productId: 14
            },
            { 
              img: 'https://i.postimg.cc/yYdsGkgv/AVP03155.jpg', 
              hoverImg: 'https://i.postimg.cc/4NhWR9KP/generated-image_(20).png',
              title: 'Pink kurti set', 
              price: '₹1,799',
              originalPrice: '₹1,299',
              discount: '31% off',
              productId: 16
            },
            { 
              img: 'https://i.postimg.cc/JhWwRn0w/AVP03166.jpg', 
              hoverImg: 'https://i.postimg.cc/zGCpVYFR/generated-image_(21).png',
              title: 'A line dress', 
              price: '₹1,499',
              originalPrice: '₹2,299',
              discount: '30% off',
              productId: 17
            },
            { 
              img: 'https://i.postimg.cc/25YtPK9r/AVP03180.jpg', 
              hoverImg: 'https://i.postimg.cc/3w31Gftf/generated-image_(22).png',
              title: 'Wine midi dress', 
              price: '₹1,499',
              originalPrice: '₹1,899',
              discount: '32% off',
              productId: 18
            },
            { 
              img: 'https://i.postimg.cc/P5Sfx1GG/AVP03051.jpg', 
              hoverImg: 'https://i.postimg.cc/3rt0K84c/generated-image-26.png',
              title: 'Beige midi dress', 
              price: '₹1,699',
              originalPrice: '₹2,199',
              discount: '32% off',
              productId: 9
            },
            { 
              img: 'https://i.postimg.cc/wMFxmNts/AVP03138.jpg', 
              hoverImg: 'https://i.postimg.cc/tC1JphHs/generated-image-27.png',
              title: 'Purple handpaint kurti set', 
              price: '₹2,199',
              originalPrice: '₹9,999',
              discount: '30% off',
              productId: 15
            }
          ].map((product, i)=> (
            <div 
              key={i} 
              ref={addToTrendingRefs}
              className="scroll-animate golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer group overflow-hidden new-arrival-frame"
              onClick={() => {
                // Navigate to product detail page if productId exists
                console.log('TRENDING PRODUCTS frame clicked, productId:', product.productId);
                if (product.productId) {
                  console.log('Navigating to product:', `/product/${product.productId}`);
                  navigate(`/product/${product.productId}`);
                } else {
                  console.log('No productId found for this frame');
                }
              }}
            >
              <div className="w-full h-80 md:h-96 relative overflow-hidden rounded-t-xl">
                {/* Original Image */}
                <img 
                  src={product.img} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out absolute inset-0 original-img"
                />
                {/* Hover Image */}
                <img 
                  src={product.hoverImg} 
                  alt={`${product.title} hover`}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out absolute inset-0 hover-img"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {product.discount}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm md:text-base font-medium line-clamp-2 transition-colors duration-300 group-hover:text-brand-primary">{product.title}</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-brand-secondary font-bold text-sm md:text-base transition-colors duration-300 group-hover:text-brand-primary">{product.price}</div>
                  <div className="text-gray-500 line-through text-xs">{product.originalPrice}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional trio block with enhanced glossy effects */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-glossy-shine opacity-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-10 lg:px-16 relative z-10">
          {/* NEW ARRIVAL card */}
          <div 
            key="NEW ARRIVAL" 
            ref={addToPromoRefs}
            className="scroll-animate-rotate relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-glossy cursor-pointer border-2 border-golden-200 hover:border-golden-400"
          >
            <div className="w-full h-[360px] sm:h-[420px] md:h-[520px]">
              <img 
                src="https://i.postimg.cc/59GbZfBJ/generated_image_6.png" 
                alt="NEW ARRIVAL" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-golden-900/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <div className="text-2xl md:text-4xl font-bold tracking-wide mb-6 drop-shadow-lg transition-all duration-300 group-hover:text-golden-200" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.7)'}}>NEW ARRIVAL</div>
              <button className="golden-btn text-xs md:text-sm tracking-widest border-2 border-golden-300 bg-glossy-gold/90 hover:bg-glossy-gold transition-all duration-300 shadow-glossy hover:shadow-golden-lg">SHOP NOW</button>
            </div>
          </div>
          
          {/* BEST SELLER card */}
          <div 
            key="BEST SELLER" 
            ref={addToPromoRefs}
            className="scroll-animate-rotate relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-glossy cursor-pointer border-2 border-golden-200 hover:border-golden-400"
          >
            <div className="w-full h-[360px] sm:h-[420px] md:h-[520px]">
              <img 
                src="https://i.postimg.cc/NjvYjbCP/generated_image_4.png" 
                alt="BEST SELLER" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-golden-900/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <div className="text-2xl md:text-4xl font-bold tracking-wide mb-6 drop-shadow-lg transition-all duration-300 group-hover:text-golden-200" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.7)'}}>BEST SELLER</div>
              <button className="golden-btn text-xs md:text-sm tracking-widest border-2 border-golden-300 bg-glossy-gold/90 hover:bg-glossy-gold transition-all duration-300 shadow-glossy hover:shadow-golden-lg">EXPLORE COLLECTION</button>
            </div>
          </div>
          
          {/* TOP PRODUCTS card */}
          <div 
            key="TOP PRODUCTS" 
            ref={addToPromoRefs}
            className="scroll-animate-rotate relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-glossy cursor-pointer border-2 border-golden-200 hover:border-golden-400"
          >
            <div className="w-full h-[360px] sm:h-[420px] md:h-[520px]">
              <img 
                src="https://i.postimg.cc/FRCNF4wj/generated_image_05.png" 
                alt="TOP PRODUCTS" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-golden-900/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <div className="text-2xl md:text-4xl font-bold tracking-wide mb-6 drop-shadow-lg transition-all duration-300 group-hover:text-golden-200" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.7)'}}>TOP PRODUCTS</div>
              <button className="golden-btn text-xs md:text-sm tracking-widest border-2 border-golden-300 bg-glossy-gold/90 hover:bg-glossy-gold transition-all duration-300 shadow-glossy hover:shadow-golden-lg">EXPLORE COLLECTION</button>
            </div>
          </div>
        </div>
      </section>



      {/* Removed legacy Shop by Category, About, and bottom New Arrivals sections */}
    </div>
  )
}