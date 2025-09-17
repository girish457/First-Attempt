/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { 
        brand: { 
          primary: '#D4AF37', // Rich Gold
          secondary: '#FFD700', // Bright Gold
          accent: '#B8860B', // Dark Golden Rod
          light: '#FFF8DC', // Cornsilk
          cream: '#FFFBF0' // Ivory
        },
        golden: {
          50: '#FFFBF0',
          100: '#FFF8DC',
          200: '#FFE55C',
          300: '#FFD700',
          400: '#F4C430',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#9B7A0C',
          800: '#8B6914',
          900: '#6B5B1A'
        }
      },
      fontFamily: { poppins: ['Poppins','ui-sans-serif','system-ui'] },
      keyframes: { 
        marquee: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(-100%)' } },
        goldShimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } }
      },
      animation: { 
        marquee: 'marquee 12s linear infinite',
        goldShimmer: 'goldShimmer 3s ease-in-out infinite'
      },
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
        'golden-shimmer': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)'
      }
    }
  },
  plugins: []
}


