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
    {label:'Royal aura', img:'https://i.postimg.cc/cJMJSPsm/generated-images-016.png'},
    {label:'Everyday elegance', img:'https://i.postimg.cc/wB0dFzqS/generated-image-1.png'},
    {label:'Threads loom', img:'https://i.postimg.cc/NMdfyT22/generated-images-017.png'},
    {label:'Handpaint love', img:'https://i.postimg.cc/0jLvmCkj/generated-image-03.png'},
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
      title: 'Blue Co-ord Set'
    },
    { 
      src: 'https://player.vimeo.com/video/1120564287',
      title: 'Mustard Ethnic'
    },
    { 
      src: 'https://player.vimeo.com/video/1120564518',
      title: 'Anarkali Collection'
    },
    { 
      src: 'https://player.vimeo.com/video/1120564696',
      title: 'Red Traditional'
    },
    { 
      src: 'https://player.vimeo.com/video/1120563936',
      title: 'Elegant Lehenga'
    },
    { 
      src: 'https://player.vimeo.com/video/1120564287',
      title: 'Designer Kurti'
    },
    { 
      src: 'https://player.vimeo.com/video/1120564518',
      title: 'Floral Dress'
    },
    { 
      src: 'https://player.vimeo.com/video/1120564696',
      title: 'Silk Saree'
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
                >
                  <div className="category-circle w-40 h-40 md:w-52 md:h-52 rounded-full ring-2 ring-golden-300 hover:ring-4 hover:ring-brand-primary transition-all duration-150 ease-out shadow-golden hover:shadow-glossy relative z-10 bg-gray-100 overflow-hidden">
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
          {/* New Arrival Images */}
          {[
            { 
              img: 'https://i.postimg.cc/Bvq0xb0T/generated-image01.png', 
              hoverImg: 'https://i.postimg.cc/5284BDFV/generated-image-10.png', // Frame 1 hover image
              name: 'Elegant Red Dress' 
            },
            { 
              img: 'https://i.postimg.cc/cJMJSPsm/generated-images-016.png', 
              hoverImg: 'https://i.postimg.cc/59GbZfBJ/generated-image-6.png', // Frame 2 hover image
              name: 'Floral Print Kurti' 
            },
            { 
              img: 'https://i.postimg.cc/dtbQTJ36/generated-image-011.png', 
              hoverImg: 'https://i.postimg.cc/wB0dFzqS/generated-image-1.png', // Frame 3 hover image
              name: 'Designer Anarkali' 
            },
            { 
              img: 'https://i.postimg.cc/j2WKL1rB/generated-image-04.png', 
              hoverImg: 'https://i.postimg.cc/J7pQwhY0/generated-image-2.png', // Frame 4 hover image
              name: 'Silk Saree' 
            },
            { 
              img: 'https://i.postimg.cc/0jLvmCkj/generated-image-03.png', 
              hoverImg: 'https://i.postimg.cc/bNHSXVwT/generated-image-3.png', // Frame 5 hover image
              name: 'Cotton Lehenga' 
            },
            { 
              img: 'https://i.postimg.cc/FRCNF4wj/generated-image-05.png', 
              hoverImg: 'https://i.postimg.cc/SxM5N9HD/generated-image-4.png', // Frame 6 hover image
              name: 'Embroidered Suit' 
            },
            { 
              img: 'https://i.postimg.cc/HWPkdwCf/generated-image-014.png', 
              hoverImg: 'https://i.postimg.cc/NjvYjbCP/generated-image-4.png', // Frame 7 hover image
              name: 'Party Wear Gown' 
            },
            { 
              img: 'https://i.postimg.cc/YSkpb81m/generated-image-012.png', 
              hoverImg: 'https://i.postimg.cc/MZ01xpsV/generated-image-6.png', // Frame 8 hover image
              name: 'Traditional Outfit' 
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              ref={addToArrivalRefs}
              className="scroll-animate-left arrival-card rounded-2xl overflow-hidden golden-card transform hover:scale-105 hover:-translate-y-3 hover:rotate-1 hover:shadow-glossy hover:border-brand-primary cursor-pointer transition-all duration-500 ease-out new-arrival-frame"
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
                      <div className="font-medium truncate transition-colors duration-300 group-hover:text-brand-primary">Sample Product Title</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="font-bold transition-colors duration-300 group-hover:text-brand-secondary">₹1,999</div>
                        <div className="text-gray-500 line-through text-sm">₹2,999</div>
                      </div>
                      <div className="inline-block mt-2 text-xs bg-golden-gradient text-white rounded px-3 py-1 transition-all duration-300 group-hover:shadow-md">30% off</div>
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
                      <div className="font-medium truncate transition-colors duration-300 group-hover:text-brand-primary">Sample Product Title</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="font-bold transition-colors duration-300 group-hover:text-brand-secondary">₹1,999</div>
                        <div className="text-gray-500 line-through text-sm">₹2,999</div>
                      </div>
                      <div className="inline-block mt-2 text-xs bg-golden-gradient text-white rounded px-3 py-1 transition-all duration-300 group-hover:shadow-md">30% off</div>
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
              title: 'Elegant Silk Saree', 
              price: 'Rs. 2,499.00' 
            },
            { 
              img: 'https://i.postimg.cc/tCrNNmWY/AVP02962.jpg', 
              hoverImg: 'https://i.postimg.cc/L8pwyTyL/generated-image_(7).png',
              title: 'Designer Kurti Set', 
              price: 'Rs. 1,899.00' 
            },
            { 
              img: 'https://i.postimg.cc/qqvCt4mQ/AVP02972.jpg', 
              hoverImg: 'https://i.postimg.cc/NfTZ7VxQ/generated-image_(8).png',
              title: 'Floral Print Lehenga', 
              price: 'Rs. 3,299.00' 
            },
            { 
              img: 'https://i.postimg.cc/mDbPqTGR/AVP02989.jpg', 
              hoverImg: 'https://i.postimg.cc/zGCpVYFR/generated-image_(21).png',
              title: 'Cotton Anarkali', 
              price: 'Rs. 1,599.00' 
            },
            { 
              img: 'https://i.postimg.cc/HnrkDxvG/AVP03003.jpg', 
              hoverImg: 'https://i.postimg.cc/9XD6zzRR/generated-image_(13).png',
              title: 'Embroidered Suit', 
              price: 'Rs. 2,199.00' 
            },
            { 
              img: 'https://i.postimg.cc/g0B0M84y/AVP03032.jpg', 
              hoverImg: 'https://i.postimg.cc/5jcq2sH3/generated-image_(14).png',
              title: 'Traditional Gown', 
              price: 'Rs. 2,799.00' 
            },
            { 
              img: 'https://i.postimg.cc/h41kccW6/AVP03068.jpg', 
              hoverImg: 'https://i.postimg.cc/WzqwVB4z/generated-image_(15).png',
              title: 'Party Wear Dress', 
              price: 'Rs. 1,999.00' 
            },
            { 
              img: 'https://i.postimg.cc/QNFfnDNc/AVP03085.jpg', 
              hoverImg: 'https://i.postimg.cc/pXrGdSm2/generated-image-25.png',
              title: 'Casual Ethnic Wear', 
              price: 'Rs. 1,299.00' 
            },
            { 
              img: 'https://i.postimg.cc/d0W94HzW/AVP03096.jpg', 
              hoverImg: 'https://i.postimg.cc/vBNtpYbC/generated-image_(16).png',
              title: 'Designer Salwar Suit', 
              price: 'Rs. 2,399.00' 
            },
            { 
              img: 'https://i.postimg.cc/qMXy1DK8/AVP03114.jpg', 
              hoverImg: 'https://i.postimg.cc/266xcbR4/generated-image_(17).png',
              title: 'Banarasi Silk Dupatta', 
              price: 'Rs. 899.00' 
            },
            { 
              img: 'https://i.postimg.cc/XYqq9skN/AVP03129.jpg', 
              hoverImg: 'https://i.postimg.cc/tgD5Ndfq/generated-image_(18).png',
              title: 'Chanderi Kurti', 
              price: 'Rs. 1,499.00' 
            },
            { 
              img: 'https://i.postimg.cc/3x07KVZG/AVP03158.jpg', 
              hoverImg: 'https://i.postimg.cc/4NhWR9KP/generated-image_(20).png',
              title: 'Georgette Saree', 
              price: 'Rs. 2,599.00' 
            },
            // 4th row (corrected frames)
            { 
              img: 'https://i.postimg.cc/0QchG0fx/AVP03174.jpg', 
              hoverImg: 'https://i.postimg.cc/zGCpVYFR/generated-image_(21).png',
              title: 'Designer Lehenga', 
              price: 'Rs. 3,499.00' 
            },
            { 
              img: 'https://i.postimg.cc/ZnX7j7yk/AVP03184.jpg', 
              hoverImg: 'https://i.postimg.cc/3w31Gftf/generated-image_(22).png',
              title: 'Floral Kurti', 
              price: 'Rs. 1,799.00' 
            },
            { 
              img: 'https://i.postimg.cc/Gp9Ls9r4/AVP03050.jpg', 
              hoverImg: 'https://i.postimg.cc/3rt0K84c/generated-image-26.png',
              title: 'Anarkali Suit', 
              price: 'Rs. 2,299.00' 
            },
            { 
              img: 'https://i.postimg.cc/59m2GhPN/AVP03140.jpg', 
              hoverImg: 'https://i.postimg.cc/tC1JphHs/generated-image-27.png',
              title: 'Silk Saree', 
              price: 'Rs. 2,999.00' 
            }
          ].map((product, i)=> (
            <div 
              key={i} 
              ref={addToTrendingRefs}
              className="scroll-animate golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer group overflow-hidden new-arrival-frame"
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
              </div>
              <div className="p-4">
                <div className="text-sm md:text-base font-medium line-clamp-2 transition-colors duration-300 group-hover:text-brand-primary">{product.title}</div>
                <div className="mt-2 text-brand-secondary font-bold text-sm md:text-base transition-colors duration-300 group-hover:text-brand-primary">{product.price}</div>
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