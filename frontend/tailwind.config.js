/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { 
        brand: { 
          primary: '#FFD700', // Bright Glossy Gold
          secondary: '#FFA500', // Golden Orange
          accent: '#FF8C00', // Dark Orange
          light: '#FFFACD', // Lemon Chiffon
          cream: '#FFF8DC' // Cornsilk
        },
        golden: {
          50: '#FFFEF7',
          100: '#FFFACD',
          200: '#FFF59D',
          300: '#FFEB3B',
          400: '#FFD700',
          500: '#FFC107',
          600: '#FF8F00',
          700: '#FF6F00',
          800: '#E65100',
          900: '#BF360C'
        },
        glossy: {
          gold: '#FFD700',
          amber: '#FFBF00',
          bronze: '#CD7F32',
          copper: '#B87333',
          cream: '#FFFDD0'
        }
      },
      fontFamily: { poppins: ['Poppins','ui-sans-serif','system-ui'] },
      keyframes: { 
        marquee: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(-100%)' } },
        goldShimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        glossyShine: { '0%': { transform: 'translateX(-100%) skewX(-15deg)' }, '100%': { transform: 'translateX(200%) skewX(-15deg)' } },
        goldenPulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.8', transform: 'scale(1.05)' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        bounceIn: { '0%': { opacity: '0', transform: 'scale(0.3)' }, '50%': { opacity: '1', transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        rotateGlow: { '0%': { transform: 'rotate(0deg)', filter: 'hue-rotate(0deg)' }, '100%': { transform: 'rotate(360deg)', filter: 'hue-rotate(360deg)' } },
        shimmerWave: { '0%': { transform: 'translateX(-100%)' }, '50%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(100%)' } },
        pulse3d: { '0%, 100%': { transform: 'scale(1) rotateY(0deg)' }, '50%': { transform: 'scale(1.05) rotateY(5deg)' } },
        // Scroll Animation Keyframes
        slideInFromLeft: { '0%': { opacity: '0', transform: 'translateX(-100px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInFromRight: { '0%': { opacity: '0', transform: 'translateX(100px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInFromBottom: { '0%': { opacity: '0', transform: 'translateY(100px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInFromTop: { '0%': { opacity: '0', transform: 'translateY(-100px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.8)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        rotateIn: { '0%': { opacity: '0', transform: 'rotate(-180deg) scale(0.8)' }, '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' } },
        flipIn: { '0%': { opacity: '0', transform: 'rotateY(-90deg)' }, '100%': { opacity: '1', transform: 'rotateY(0deg)' } },
        zoomIn: { '0%': { opacity: '0', transform: 'scale(0.5)' }, '100%': { opacity: '1', transform: 'scale(1)' } }
      },
      animation: { 
        marquee: 'marquee 12s linear infinite',
        goldShimmer: 'goldShimmer 3s ease-in-out infinite',
        glossyShine: 'glossyShine 2s ease-in-out infinite',
        goldenPulse: 'goldenPulse 2s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        bounceIn: 'bounceIn 0.8s ease-out',
        float: 'float 3s ease-in-out infinite',
        rotateGlow: 'rotateGlow 4s linear infinite',
        shimmerWave: 'shimmerWave 2.5s ease-in-out infinite',
        pulse3d: 'pulse3d 2s ease-in-out infinite',
        // Scroll Animation Classes
        'slide-in-left': 'slideInFromLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInFromRight 0.8s ease-out forwards',
        'slide-in-bottom': 'slideInFromBottom 0.8s ease-out forwards',
        'slide-in-top': 'slideInFromTop 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'rotate-in': 'rotateIn 0.8s ease-out forwards',
        'flip-in': 'flipIn 0.8s ease-out forwards',
        'zoom-in': 'zoomIn 0.6s ease-out forwards'
      },
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
        'golden-shimmer': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
        'glossy-gold': 'linear-gradient(145deg, #FFD700 0%, #FFEB3B 25%, #FFC107 50%, #FF8F00 75%, #FF6F00 100%)',
        'glossy-shine': 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.3) 100%)',
        'golden-metallic': 'linear-gradient(135deg, #FFD700 0%, #B8860B 25%, #FFD700 50%, #DAA520 75%, #FFD700 100%)'
      },
      boxShadow: {
        'golden': '0 4px 20px rgba(255, 215, 0, 0.4)',
        'golden-lg': '0 10px 40px rgba(255, 215, 0, 0.5)',
        'glossy': '0 8px 32px rgba(255, 193, 7, 0.6), inset 0 1px 0 rgba(255,255,255,0.5)',
        'golden-inset': 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)'
      }
    }
  },
  plugins: []
}


