import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { cartService } from '../services/cart.js'

function Tooltip({ label, children }) {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
    </div>
  )
}

export default function RootLayout(){
  const [isMobileMenu, setIsMobileMenu] = React.useState(false)
  const [cartCount, setCartCount] = React.useState(0)
  const [theme, setTheme] = React.useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  React.useEffect(() => {
    const root = document.documentElement
    
    // Apply theme immediately to prevent flash
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme)
    
    // Force a small delay to ensure all styles are applied
    setTimeout(() => {
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }, 10)
  }, [theme])

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      const saved = localStorage.getItem('theme')
      if (!saved) setTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  // Update cart count on component mount and listen for changes
  React.useEffect(() => {
    // Initial cart count
    const initialCount = cartService.getCartCount()
    setCartCount(initialCount)
    cartService.updateCartCount()
    
    // Listen for cart updates
    const handleCartUpdate = (event) => {
      setCartCount(event.detail.count)
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col w-full m-0 p-0">
      <div className="w-full bg-glossy-gold text-white text-xs md:text-sm shadow-glossy relative overflow-hidden m-0 p-0">
        <div className="container-responsive py-2 overflow-hidden relative z-10 m-0 p-0">
          <div className="md:text-center whitespace-nowrap md:whitespace-normal [animation:marquee_12s_linear_infinite] md:[animation:none] font-medium drop-shadow-lg m-0 p-0">
            ✨ Free Shipping on Orders Above ₹999 | Easy Returns | Premium Golden Collection ✨
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/90 backdrop-blur-md border-b border-golden-300 dark:border-golden-700 shadow-glossy m-0 p-0">
        <div className="container-responsive flex items-center justify-between h-16 m-0 p-0">
          <Link to="/" className="flex items-center gap-3 font-bold text-brand-primary hover:text-brand-secondary transition-all duration-300 transform hover:scale-105 m-0 p-0">
            <span className="text-3xl animate-goldShimmer m-0 p-0"><i className="fa-solid fa-crown"></i></span>
            <div className="flex flex-col m-0 p-0">
              <span className="text-xl bg-glossy-gold bg-clip-text text-transparent font-bold drop-shadow-sm m-0 p-0">Runway</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-normal -mt-1 m-0 p-0">by yogesh</span>
            </div>
          </Link>
          <button className="md:hidden p-2 m-0" onClick={()=>setIsMobileMenu(v=>!v)} aria-label="Menu"><i className="fa-solid fa-bars text-xl"></i></button>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium m-0 p-0">
            <NavLink to="/" end className={({isActive})=>`hover:text-brand-primary transition-all duration-300 hover:scale-105 ${isActive? 'text-brand-primary font-semibold' : 'text-gray-700 dark:text-gray-300'} m-0 p-0`}>Home</NavLink>
            <NavLink to="/shop" className={({isActive})=>`hover:text-brand-primary transition-all duration-300 hover:scale-105 ${isActive? 'text-brand-primary font-semibold' : 'text-gray-700 dark:text-gray-300'} m-0 p-0`}>Shop</NavLink>
            <NavLink to="/about" className={({isActive})=>`hover:text-brand-primary transition-all duration-300 hover:scale-105 ${isActive? 'text-brand-primary font-semibold' : 'text-gray-700 dark:text-gray-300'} m-0 p-0`}>About Us</NavLink>
            <NavLink to="/contact" className={({isActive})=>`hover:text-brand-primary transition-all duration-300 hover:scale-105 ${isActive? 'text-brand-primary font-semibold' : 'text-gray-700 dark:text-gray-300'} m-0 p-0`}>Contact Us</NavLink>
          </nav>
          <div className="flex items-center gap-3 m-0 p-0">
            <Tooltip label="Search"><button className="w-11 h-11 grid place-items-center rounded-full hover:bg-golden-200 anim-btn text-brand-accent hover:text-brand-primary transition-all duration-300 shadow-sm hover:shadow-glossy m-0 p-0"><i className="fa-solid fa-magnifying-glass"></i></button></Tooltip>
            <Tooltip label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <button 
                className="w-11 h-11 grid place-items-center rounded-full hover:bg-golden-200 dark:hover:bg-golden-700 anim-btn text-brand-accent hover:text-brand-primary transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-glossy m-0 p-0" 
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
                aria-label="Toggle theme"
              >
                <div className="relative m-0 p-0">
                  {theme === 'dark' ? (
                    <i className="fa-solid fa-sun text-lg text-golden-300 animate-pulse drop-shadow-sm m-0 p-0"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-lg text-golden-600 drop-shadow-sm m-0 p-0"></i>
                  )}
                </div>
              </button>
            </Tooltip>
            <Tooltip label="Account"><NavLink to="/account" className="w-11 h-11 grid place-items-center rounded-full hover:bg-golden-200 anim-btn text-brand-accent hover:text-brand-primary transition-all duration-300 shadow-sm hover:shadow-glossy m-0 p-0"><i className="fa-regular fa-user"></i></NavLink></Tooltip>
            <Tooltip label="Wishlist"><button className="w-11 h-11 grid place-items-center rounded-full hover:bg-golden-200 anim-btn text-brand-accent hover:text-brand-primary transition-all duration-300 shadow-sm hover:shadow-glossy m-0 p-0"><i className="fa-regular fa-heart"></i></button></Tooltip>
            <Tooltip label="Cart"><NavLink to="/cart" className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-golden-gradient text-white hover:scale-110 transition-all duration-300 anim-btn shadow-lg hover:shadow-golden m-0 p-0"><i className="fa-solid fa-bag-shopping"></i><span className="absolute -top-1 -right-1 text-[10px] bg-golden-800 text-white rounded-full px-1.5 py-0.5 cart-count transition-transform shadow-sm m-0 p-0">{cartCount}</span></NavLink></Tooltip>
          </div>
        </div>
        {isMobileMenu && (
          <div className="md:hidden border-t bg-white/95 dark:bg-gray-900/95 backdrop-blur border-golden-200 m-0 p-0">
            <div className="container-responsive py-6 grid gap-4 text-lg m-0 p-0">
              <NavLink to="/" onClick={()=>setIsMobileMenu(false)} className="hover:text-brand-primary transition-colors font-medium m-0 p-0">Home</NavLink>
              <details><summary className="cursor-pointer hover:text-brand-primary transition-colors font-medium m-0 p-0">Womenswear</summary><div className="mt-2 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300 m-0 p-0"><a href="#" className="hover:text-brand-primary transition-colors m-0 p-0">Sarees</a><a href="#" className="hover:text-brand-primary transition-colors m-0 p-0">Lehengas</a><a href="#" className="hover:text-brand-primary transition-colors m-0 p-0">Kurta Sets</a></div></details>
              <details><summary className="cursor-pointer hover:text-brand-primary transition-colors font-medium m-0 p-0">Kidswear</summary><div className="mt-2 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300 m-0 p-0"><a href="#" className="hover:text-brand-primary transition-colors m-0 p-0">Girls</a><a href="#" className="hover:text-brand-primary transition-colors m-0 p-0">Boys</a></div></details>
              <NavLink to="/shop" onClick={()=>setIsMobileMenu(false)} className="hover:text-brand-primary transition-colors font-medium m-0 p-0">Shop</NavLink>
              <NavLink to="/about" onClick={()=>setIsMobileMenu(false)} className="hover:text-brand-primary transition-colors font-medium m-0 p-0">About Us</NavLink>
              <NavLink to="/contact" onClick={()=>setIsMobileMenu(false)} className="hover:text-brand-primary transition-colors font-medium m-0 p-0">Contact Us</NavLink>
              <NavLink to="/account" onClick={()=>setIsMobileMenu(false)} className="hover:text-brand-primary transition-colors font-medium m-0 p-0">My Account</NavLink>
              <NavLink to="/cart" onClick={()=>setIsMobileMenu(false)} className="hover:text-brand-primary transition-colors font-medium m-0 p-0">Cart</NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full m-0 p-0"><Outlet /></main>

      <footer className="bg-gradient-to-r from-golden-100 to-golden-200 dark:from-gray-800 dark:to-gray-900 border-t border-golden-300 dark:border-gray-600 shadow-glossy relative overflow-hidden m-0 p-0">
        <div className="container-responsive py-12 grid md:grid-cols-4 gap-8 text-sm relative z-10 m-0 p-0">
          <div className="m-0 p-0"><div className="flex items-center gap-3 font-bold text-brand-primary mb-4 m-0 p-0"><i className="fa-solid fa-crown text-2xl drop-shadow-sm m-0 p-0"></i><div className="flex flex-col m-0 p-0"><span className="text-lg bg-glossy-gold bg-clip-text text-transparent font-bold drop-shadow-sm m-0 p-0">Runway</span><span className="text-xs text-gray-600 dark:text-gray-400 font-normal -mt-1 m-0 p-0">by yogesh</span></div></div><p className="text-gray-600 dark:text-gray-400 leading-relaxed m-0 p-0">Curating elegant ethnic wear with golden touch for women and kids.</p></div>
          <div className="m-0 p-0"><h4 className="font-bold mb-4 text-brand-primary m-0 p-0">Newsletter</h4><p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed m-0 p-0">Subscribe for new arrivals and exclusive golden offers.</p><form className="flex gap-2 m-0 p-0"><input type="email" placeholder="Email address" className="flex-1 border-2 border-golden-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all m-0 p-0" /><button className="golden-btn text-sm shadow-glossy m-0 p-0">Join</button></form></div>
          <div className="m-0 p-0"><h4 className="font-bold mb-4 text-brand-primary m-0 p-0">Links</h4><ul className="space-y-3 text-gray-600 dark:text-gray-400 m-0 p-0"><li className="m-0 p-0"><a href="#" className="hover:text-brand-primary transition-colors duration-300 m-0 p-0">Terms</a></li><li className="m-0 p-0"><a href="#" className="hover:text-brand-primary transition-colors duration-300 m-0 p-0">Privacy Policy</a></li><li className="m-0 p-0"><a href="#" className="hover:text-brand-primary transition-colors duration-300 m-0 p-0">Shipping</a></li><li className="m-0 p-0"><Link to="/contact" className="hover:text-brand-primary transition-colors duration-300 m-0 p-0">Contact</Link></li></ul></div>
          <div className="m-0 p-0"><h4 className="font-bold mb-4 text-brand-primary m-0 p-0">Follow</h4><div className="flex gap-4 text-gray-600 dark:text-gray-400 text-xl m-0 p-0"><a href="#" className="hover:text-brand-primary transition-all duration-300 hover:scale-110 m-0 p-0" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a><a href="#" className="hover:text-brand-primary transition-all duration-300 hover:scale-110 m-0 p-0" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a><a href="#" className="hover:text-brand-primary transition-all duration-300 hover:scale-110 m-0 p-0" aria-label="Pinterest"><i className="fa-brands fa-pinterest"></i></a></div></div>
        </div>
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-6 border-t border-golden-300 dark:border-gray-600 bg-golden-200 dark:bg-gray-800 m-0 p-0">© {new Date().getFullYear()} Runway by yogesh. All rights reserved. ✨ Crafted with luxury in mind.</div>
      </footer>
    </div>
  )
}