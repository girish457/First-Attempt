import React from 'react'
import { Link } from 'react-router-dom'

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
  '/040A1369_1200x.jpeg',
  '/0T3A2640_8e89b49b-36cc-4775-bc89-5a72e0b42ab8_1200x.jpeg',
  '/0T3A2791_0b30f11b-5c7f-4bca-9112-2477e5d6c987_1200x.jpeg',
  '/indo_78a382b4-5c37-49e6-b8e6-96e8711a390c_1500x.jpeg',
  '/jumpsuit_99e4c0d7-ded6-411f-a6d6-54fceda67cc1_1500x.jpeg',
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
  const [current, setCurrent] = React.useState(0)
  const startX = React.useRef(0)
  const delta = React.useRef(0)
  const productCatsRef = React.useRef(null)

  React.useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % bannerImages.length), 4500)
    return () => clearInterval(t)
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
                <span className="bg-golden-gradient bg-clip-text text-transparent">✨ Golden Elegance ✨</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg font-medium">
                Discover our luxurious collection of ethnic wear with a golden touch
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop" className="golden-btn text-lg px-8 py-4 text-white shadow-golden-lg border border-white/30">
                  EXPLORE COLLECTION
                </Link>
                <button className="px-8 py-4 rounded-lg border-2 border-white/80 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  WATCH LOOKBOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Carousel (full-bleed) */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide mb-8 text-brand-primary">✨ PRODUCT CATEGORIES ✨</h2>
        <div className="relative">
          <button aria-label="Prev" onClick={()=>{productCatsRef.current?.scrollBy({left:-300, behavior:'smooth'})}} className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center anim-btn hover:scale-110">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div ref={productCatsRef} className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-start gap-10 md:gap-12 px-6 md:px-10 lg:px-16">
              {[
                {label:'Vacation',img:'/vacation.jpg'},
                {label:'Baby',img:'/Baby.jpg'},
                {label:'Boys',img:'/boys.jpg'},
                {label:'Girls',img:'/Girls.webp'},
                {label:'Festive',img:'/Festive.avif'},
                {label:'Night Suits',img:'/Night Suits.webp'},
              ].map((c)=> (
                <div key={c.label} className="snap-start min-w-[180px] md:min-w-[220px] flex flex-col items-center group">
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden ring-2 ring-golden-300 transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden hover:ring-4 hover:ring-brand-primary">
                    <img
                      src={c.img}
                      alt={c.label}
                      className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-110"
                      style={{
                        objectPosition: c.label === 'Vacation' ? '50% 52%' : '50% 28%',
                        transform: c.label === 'Vacation' ? 'scale(1.03)' : undefined
                      }}
                    />
                  </div>
                  <div className="mt-3 text-sm md:text-base transition-all duration-300 group-hover:text-brand-primary group-hover:font-bold">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
          <button aria-label="Next" onClick={()=>{productCatsRef.current?.scrollBy({left:300, behavior:'smooth'})}} className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center anim-btn hover:scale-110">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </section>
      {/* New Arrival block just below Product Categories */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-50">
        <h2 className="px-8 md:px-16 text-center text-3xl md:text-5xl font-bold tracking-wide mb-2 text-brand-primary">✨ NEW ARRIVAL ✨</h2>
        <p className="px-8 md:px-16 text-center text-golden-700 italic mb-8 font-medium">Shop our all-new styles in ethnic and contemporary fashion for women.</p>
        <div className="px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalImages.map((src, idx)=> (
            <div key={idx} className="rounded-2xl overflow-hidden golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer">
              <img src={src} alt="New arrival" className="w-full h-72 sm:h-80 md:h-[420px] object-cover transition-all duration-300 ease-out hover:scale-110" />
            </div>
          ))}
        </div>
        <div className="px-8 md:px-16 mt-6 flex justify-center">
          <Link to="/shop" className="golden-btn tracking-wide">VIEW ALL COLLECTION</Link>
        </div>
      </section>

      {/* Watch and Buy block (videos) - same layout as NEW ARRIVAL */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 className="px-8 md:px-16 text-center text-3xl md:text-5xl font-bold tracking-wide mb-2 text-brand-primary">🎬 Watch and Buy 🎬</h2>
        <p className="px-8 md:px-16 text-center text-golden-700 italic mb-8 font-medium">Autoplay lookbook videos you can shop from instantly.</p>
        <div className="px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {watchVideos.map((v, idx)=> (
            <div key={idx} className="group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer">
              <div className="relative overflow-hidden rounded-t-2xl">
                <video src={v.src} className="w-full h-72 sm:h-80 md:h-[420px] object-cover transition-all duration-300 ease-out group-hover:scale-110" autoPlay muted loop playsInline />
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
          ))}
        </div>
      </section>

      {/* Shop by Categories (3 large frames) */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-50">
        <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide mb-6 text-brand-primary">🛍️ SHOP BY CATEGORIES 🛍️</h2>
        <div className="relative px-4 md:px-10 lg:px-16">
          <button aria-label="Prev" className="hidden md:grid absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-golden-gradient text-white shadow-golden border-2 border-white place-items-center anim-btn hover:scale-110">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
            {[
              {label:'Kurta Set', img:'/LBL101ks396_1_1200x.jpeg'},
              {label:'Anarkali Set', img:'/indo_78a382b4-5c37-49e6-b8e6-96e8711a390c_1500x.jpeg'},
              {label:'Co-Ords', img:'/040A1369_1200x.jpeg'}
            ].map((c)=> (
              <div key={c.label} className="group golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg cursor-pointer overflow-hidden">
                <div className="rounded-2xl overflow-hidden">
                  <img src={c.img} alt={c.label} className="w-full h-[360px] sm:h-[420px] md:h-[520px] object-cover transition-all duration-300 ease-out group-hover:scale-110" />
                </div>
                <div className="mt-4 text-center font-bold transition-all duration-300 group-hover:text-brand-primary text-lg">{c.label}</div>
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
        <h2 className="text-center text-3xl md:text-4xl font-bold tracking-wide mb-8 text-brand-primary">👶 NEW BORN 👶</h2>
        <div className="px-4 md:px-10 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {[
            {img:'/040A1369_1200x.jpeg', title:'Cotton Muslin Baby Angrakha', price:'Rs. 549.00'},
            {img:'/LBL101ks396_1_1200x.jpeg', title:'Cotton Muslin Baby | Pastel Pink', price:'Rs. 549.00'},
            {img:'/0T3A2791_0b30f11b-5c7f-4bca-9112-2477e5d6c987_1200x.jpeg', title:'Baby Co-ord Set | Mermaid', price:'Rs. 845.00'},
            {img:'/0T3A2640_8e89b49b-36cc-4775-bc89-5a72e0b42ab8_1200x.jpeg', title:'Sleeve Romper', price:'Rs. 560.00'},
            {img:'/indo_78a382b4-5c37-49e6-b8e6-96e8711a390c_1500x.jpeg', title:'Swaddle | Nayantaara', price:'Rs. 475.00'},
            {img:'/jumpsuit_99e4c0d7-ded6-411f-a6d6-54fceda67cc1_1500x.jpeg', title:'Swaddle | Marigold', price:'Rs. 475.00'},
            {img:'/sharara_ff2760d2-32bc-4149-9c35-2d6700926db6_1500x.jpeg', title:'Newborn Muslin Gift Set', price:'Rs. 900.00'},
            {img:'/Ankita_Singh_4b539387-fbfc-4825-bc6f-b9c9aa539be8.jpeg', title:'Muslin Blanket', price:'Rs. 900.00'}
          ].map((p, i)=> (
            <div key={i} className="golden-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg hover:border-brand-primary cursor-pointer group overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-60 md:h-64 object-cover transition-all duration-300 ease-out group-hover:scale-110" />
              <div className="p-4">
                <div className="text-sm md:text-base font-medium line-clamp-2 transition-colors duration-300 group-hover:text-brand-primary">{p.title}</div>
                <div className="mt-2 text-brand-secondary font-bold text-sm md:text-base transition-colors duration-300 group-hover:text-brand-primary">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional trio block similar to screenshot */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-white to-golden-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-10 lg:px-16">
          {[
            {title:'NEW ARRIVAL', cta:'SHOP NOW', img:'/LBL101ks396_1_1200x.jpeg'},
            {title:'BEST SELLER', cta:'EXPLORE COLLECTION', img:'/indo_78a382b4-5c37-49e6-b8e6-96e8711a390c_1500x.jpeg'},
            {title:'TOP PRODUCTS', cta:'EXPLORE COLLECTION', img:'/040A1369_1200x.jpeg'}
          ].map((item)=> (
            <div key={item.title} className="relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden-lg cursor-pointer">
              <img src={item.img} alt={item.title} className="w-full h-[360px] sm:h-[420px] md:h-[520px] object-cover transition-all duration-300 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 group-hover:from-golden-900/60"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <div className="text-2xl md:text-4xl font-bold tracking-wide mb-6 drop-shadow-lg transition-all duration-300 group-hover:text-golden-200">✨ {item.title} ✨</div>
                <button className="golden-btn text-xs md:text-sm tracking-widest border border-white/90 bg-golden-gradient/80 hover:bg-golden-gradient transition-all duration-300">{item.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram-style feed */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-golden-50 to-white">
        <h2 className="px-4 md:px-10 lg:px-16 text-center text-2xl md:text-3xl font-bold tracking-wide mb-8 text-brand-primary">📷 WHAT'S ON OUR INSTA FEED 📷</h2>
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
            <div key={i} className="rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-golden cursor-pointer border-2 border-transparent hover:border-brand-primary">
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


