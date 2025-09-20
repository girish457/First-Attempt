import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation, useScrollAnimationSingle } from '../../hooks/useScrollAnimation'

const bannerImages = [
  '/sample 1.png',
  '/sample 2.png',
  '/sample 3.jpeg',
  '/sample 4.png',
  '/sample 5.jpeg',
]

// Public folder videos for the WATCH AND BUY block
const watchVideos = [
  { src: '/whatmore_tn_54689d8a-018d-4426-822e-a12048290da9.mp4', title: 'Roza Blue Co-ord Set', price: '₹ 1,955', oldPrice: '₹ 2,300', discount: '15% off' },
  { src: '/whatmore_tn_a85d4420-fc59-4296-b2d1-013d8c556562.mp4', title: 'Roza Mustard Co-ord Set', price: '₹ 1,955', oldPrice: '₹ 2,300', discount: '15% off' },
  { src: '/whatmore_tn_e71dbde5-af85-49de-8b4d-0b4fa04b9413.mp4', title: 'Bhumi Blue Anarkali Set', price: '₹ 4,250', oldPrice: '₹ 5,000', discount: '15% off' },
  { src: '/whatmore_tn_fba40a61-c29b-40f3-b599-0bfca5ebcfd5.mp4', title: 'Bhumi Red Anarkali Set', price: '₹ 4,250', oldPrice: '₹ 5,000', discount: '15% off' },
]

// Public folder images for the NEW ARRIVAL block (8 unique)
const newArrivalImages = [
  'https://lh3.googleusercontent.com/d/15gXb3f1o4ZkZLRUWEd6tHyZIOi6xhP_k',
  'https://drive.google.com/uc?export=download&id=1pKZau-1FX4ALJxtNxWLOBCk7jVINn0zp',
  'https://drive.google.com/uc?export=download&id=18ZXCRtE1xlqaSpTsAffbnsCIQZJDOkOI',
  'https://drive.google.com/uc?export=download&id=1d2512nQvvZyjsvcroQXP3GBW0zlgZ3dj',
  'https://drive.google.com/uc?export=download&id=1mYW2fNV3FSZzXLiKzGcqN2X0oiOEMxym',
  '/LBL101ks396_1_1200x.jpeg',
  '/sharara_ff2760d2-32bc-4149-9c35-2d6700926db6_1500x.jpeg',
  '/Ankita_Singh_4b539387-fbfc-4825-bc6f-b9c9aa539be8.jpeg',
]

const categories = [
  { name: 'Sarees', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Lehengas', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Kurta Sets', image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Kids Ethnic', image: 'https://images.unsplash.com/photo-1545199097-56d6fd8f2df5?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Anarkali', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Jewellery', image: 'https://images.unsplash.com/photo-1585386959984-a41552231698?q=80&w=1200&auto=format&fit=crop' },
]

const products = [
  { id: 1, name: 'Kanjivaram Silk Saree', price: 129.0, image: 'https://images.unsplash.com/photo-1592878944494-39c4367d514e?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, name: 'Embroidered Lehenga', price: 199.0, image: 'https://images.unsplash.com/photo-1542060748-10c28b62716a?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, name: 'Cotton Kurta Set', price: 79.0, image: 'https://images.unsplash.com/photo-1593032457861-573d56b83a25?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, name: 'Kid’s Sherwani', price: 89.0, image: 'https://images.unsplash.com/photo-1596066373295-8f0130a0d23e?q=80&w=1200&auto=format&fit=crop' },
]

export default function HomePage() {
  // Updated with new Google Drive images for frames 4-6
  const [current, setCurrent] = React.useState(0)
  const [categoryOffset, setCategoryOffset] = React.useState(0) // Carousel state
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [currentX, setCurrentX] = React.useState(0)
  const [translateX, setTranslateX] = React.useState(0)
  const startXRef = React.useRef(0)
  const delta = React.useRef(0)
  const productCatsRef = React.useRef(null)
  const containerRef = React.useRef(null)
  
  // Categories data with images (4 total: only the main 4 categories)
  const categories = [
    // First 4 main categories only
    {label:'Royal aura', img:'https://drive.google.com/uc?export=download&id=1JDlYhEmGDLl0-KJtBAXrf8NBcM6Rjb3_'},
    {label:'Everyday elegance ', img:'https://drive.google.com/uc?export=download&id=1EPO-gsYJ8sy0biuAx2IhBsD5VUjUFV9X'},
    {label:'Threads loom ', img:'https://drive.google.com/uc?export=download&id=1FZ8-1_JvbGN_1eNUQm4w5rzlqf_AJnWV'},
    {label:'Handpaint love', img:'https://drive.google.com/uc?export=download&id=15nVD6eVl7PtCUizIDqOt6iusl39__80g'},
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
    const t = setInterval(() => setCurrent((c) => (c + 1) % bannerImages.length), 4500)
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

  return (
    <div>
      <section className="relative">
        <div className="h-[80vh] md:h-[90vh] overflow-hidden relative"
             onTouchStart={(e)=>{startX.current = e.touches[0].clientX}}
             onTouchMove={(e)=>{delta.current = e.touches[0].clientX - startX.current}}
             onTouchEnd={()=>{ if (delta.current > 40) setCurrent(c=> (c-1+bannerImages.length)%bannerImages.length); else if (delta.current < -40) setCurrent(c=> (c+1)%bannerImages.length); delta.current = 0 }}>
          {bannerImages.map((src, i) => (
            <img key={i} src={src} alt="Ethnic banner" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===current? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
          <button aria-label="Prev" onClick={()=>setCurrent(c=> (c-1+bannerImages.length)%bannerImages.length)} className="hidden md:grid absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white/20 place-items-center anim-btn hover:scale-110"><i className="fa-solid fa-chevron-left"></i></button>
          <button aria-label="Next" onClick={()=>setCurrent(c=> (c+1)%bannerImages.length)} className="hidden md:grid absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white/20 place-items-center anim-btn hover:scale-110"><i className="fa-solid fa-chevron-right"></i></button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">{bannerImages.map((_,i)=> (<button key={i} onClick={()=>setCurrent(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i===current? 'bg-golden-400 shadow-golden scale-125' : 'bg-white/70 hover:bg-white'}`}></button>))}</div>
          
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
                    {/* Image placeholder for when no image is available */}
                    {!category.img && (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <i className="fa-solid fa-image text-4xl"></i>
                      </div>
                    )}
                    {category.img && (
                      <img
                        src={category.img || 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center'}
                        alt={category.label}
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover rounded-full transition-all duration-150 ease-out group-hover:scale-105 group-hover:brightness-105 transform-gpu will-change-transform"
                        style={{
                          objectPosition: category.label === 'Vacation' ? '50% 20%' : '50% 15%',
                          transform: category.label === 'Vacation' ? 'scale(1.05)' : undefined,
                          willChange: 'transform'
                        }}
                        onError={(e) => {
                          console.log(`Image failed to load for ${category.label}, trying fallback...`);
                          // Multi-tier fallback system for reliable image loading
                          const fileId = e.target.src.split('id=')[1] || e.target.src.split('/d/')[1]?.split('/')[0];
                          if (fileId && !e.target.src.includes('lh3.googleusercontent.com')) {
                            e.target.src = `https://lh3.googleusercontent.com/d/${fileId}`;
                          } else if (fileId && !e.target.src.includes('drive.google.com/uc')) {
                            e.target.src = `https://drive.google.com/uc?export=download&id=${fileId}`;
                          } else {
                            // Use reliable fallback immediately
                            const fallbacks = {
                              'Vacation': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=faces',
                              'Baby': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&crop=faces',
                              'Boys': 'https://images.unsplash.com/photo-1503944168719-90febeb433c9?w=400&h=400&fit=crop&crop=faces',
                              'Girls': 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop&crop=faces',
                              'Festive': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
                              'Night Suits': 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=400&fit=crop&crop=center',
                              'Ethnic Wear': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
                              'Traditional': 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=400&fit=crop&crop=center'
                            };
                            e.target.src = fallbacks[category.label] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=faces';
                            e.target.style.display = 'block';
                          }
                        }}
                        onLoad={() => {
                          console.log(`Successfully loaded image for ${category.label}`);
                        }}
                      />
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
          {newArrivalImages.map((src, idx)=> {
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
                  <img src={src} alt={productNames[idx]} className="w-full h-72 sm:h-80 md:h-[420px] object-cover transition-all duration-500 ease-out hover:scale-125 hover:brightness-110" />
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
          {watchVideos.map((v, idx)=> {
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
                  <video src={v.src} className="w-full h-72 sm:h-80 md:h-[420px] object-cover transition-all duration-300 ease-out group-hover:scale-110" autoPlay muted loop playsInline />
                  {/* Video name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                      <h3 className="text-sm md:text-base font-semibold text-white truncate">{videoNames[idx]}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-medium truncate transition-colors duration-300 group-hover:text-brand-primary">{v.title}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="font-bold transition-colors duration-300 group-hover:text-brand-secondary">{v.price}</div>
                    <div className="text-gray-500 line-through text-sm">{v.oldPrice}</div>
                  </div>
                  <div className="inline-block mt-2 text-xs bg-golden-gradient text-white rounded px-3 py-1 transition-all duration-300 group-hover:shadow-md">{v.discount}</div>
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
          <button aria-label="Prev" className="hidden md:grid absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center anim-btn hover:scale-110">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
            {[
              {label:'Kurta Set', img:'/LBL101ks396_1_1200x.jpeg'},
              {label:'Anarkali Set', img:'https://drive.google.com/uc?export=download&id=1d2512nQvvZyjsvcroQXP3GBW0zlgZ3dj'},
              {label:'Co-Ords', img:'/040A1369_1200x.jpeg'}
            ].map((c, index)=> (
              <div 
                key={c.label} 
                ref={addToShopRefs}
                className="scroll-animate-scale group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg cursor-pointer overflow-hidden"
              >
                <div className="rounded-2xl overflow-hidden">
                  <img src={c.img} alt={c.label} className="w-full h-[360px] sm:h-[420px] md:h-[520px] object-cover transition-all duration-300 ease-out group-hover:scale-110" />
                </div>
                <div className="mt-4 text-center font-bold transition-all duration-300 group-hover:text-brand-primary text-lg text-gray-700 dark:text-golden-300">{c.label}</div>
              </div>
            ))}
          </div>
          <button aria-label="Next" className="hidden md:grid absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center anim-btn hover:scale-110">
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
          {[
            {img:'/040A1369_1200x.jpeg', title:'Cotton Muslin Baby Angrakha', price:'Rs. 549.00'},
            {img:'/LBL101ks396_1_1200x.jpeg', title:'Cotton Muslin Baby | Pastel Pink', price:'Rs. 549.00'},
            {img:'https://drive.google.com/uc?export=download&id=18ZXCRtE1xlqaSpTsAffbnsCIQZJDOkOI', title:'Baby Co-ord Set | Mermaid', price:'Rs. 845.00'},
            {img:'https://drive.google.com/uc?export=download&id=1pKZau-1FX4ALJxtNxWLOBCk7jVINn0zp', title:'Sleeve Romper', price:'Rs. 560.00'},
            {img:'https://drive.google.com/uc?export=download&id=1d2512nQvvZyjsvcroQXP3GBW0zlgZ3dj', title:'Swaddle | Nayantaara', price:'Rs. 475.00'},
            {img:'https://drive.google.com/uc?export=download&id=1mYW2fNV3FSZzXLiKzGcqN2X0oiOEMxym', title:'Swaddle | Marigold', price:'Rs. 475.00'},
            {img:'/sharara_ff2760d2-32bc-4149-9c35-2d6700926db6_1500x.jpeg', title:'Newborn Muslin Gift Set', price:'Rs. 900.00'},
            {img:'/Ankita_Singh_4b539387-fbfc-4825-bc6f-b9c9aa539be8.jpeg', title:'Muslin Blanket', price:'Rs. 900.00'}
          ].map((p, i)=> (
            <div 
              key={i} 
              ref={addToTrendingRefs}
              className="scroll-animate golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer group overflow-hidden"
            >
              <img src={p.img} alt={p.title} className="w-full h-60 md:h-64 object-cover transition-all duration-300 ease-out group-hover:scale-110" />
              <div className="p-4">
                <div className="text-sm md:text-base font-medium line-clamp-2 transition-colors duration-300 group-hover:text-brand-primary">{p.title}</div>
                <div className="mt-2 text-brand-secondary font-bold text-sm md:text-base transition-colors duration-300 group-hover:text-brand-primary">{p.price}</div>
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
            {title:'NEW ARRIVAL', cta:'SHOP NOW', img:'/LBL101ks396_1_1200x.jpeg'},
            {title:'BEST SELLER', cta:'EXPLORE COLLECTION', img:'/indo_78a382b4-5c37-49e6-b8e6-96e8711a390c_1500x.jpeg'},
            {title:'TOP PRODUCTS', cta:'EXPLORE COLLECTION', img:'/040A1369_1200x.jpeg'}
          ].map((item, index)=> (
            <div 
              key={item.title} 
              ref={addToPromoRefs}
              className="scroll-animate-rotate relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-glossy cursor-pointer border-2 border-golden-200 hover:border-golden-400"
            >
              <img src={item.img} alt={item.title} className="w-full h-[360px] sm:h-[420px] md:h-[520px] object-cover transition-all duration-300 ease-out group-hover:scale-110" />
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
          {[
            {src:'/insta1.mp4', type:'video'},
            {src:'/insta2.mp4', type:'video'},
            {src:'/insta3.png', type:'image'},
            {src:'/insta4.png', type:'image'},
            {src:'/insta5.png', type:'image'},
            {src:'/insta6.png', type:'image'},
            {src:'/insta7.png', type:'image'},
            {src:'/insta8.png', type:'image'},
            {src:'/insta9.mp4', type:'video'},
            {src:'/insta11.png', type:'image'},
            {src:'/insta12.png', type:'image'},
            {src:'/insta 14.mp4', type:'video'}
          ].map((item, i) => (
            <div 
              key={i} 
              ref={addToInstaRefs}
              className="scroll-animate-scale rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden cursor-pointer border-2 border-transparent hover:border-brand-primary"
            >
              {item.type === 'video' ? (
                <video src={item.src} className="w-full aspect-[3/4] object-cover transition-all duration-300 ease-out hover:scale-110" autoPlay muted loop playsInline />
              ) : (
                <img src={item.src} alt="Insta highlight" className="w-full aspect-[3/4] object-cover transition-all duration-300 ease-out hover:scale-110" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Removed legacy Shop by Category, About, and bottom New Arrivals sections */}
    </div>
  )
}


