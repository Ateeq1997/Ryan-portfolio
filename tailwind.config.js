/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(15,23,42,0.45)',
        card: '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)',
        amber: '0 0 40px rgba(245,158,11,0.25)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245,158,11,0.15), transparent)'
      },
      colors: {
        ink: '#020817',
        surface: '#0a1628',
        amber: {
          DEFAULT: '#f59e0b',
          light: '#fcd34d',
          dark: '#d97706'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Baskerville', 'Georgia', 'serif'],
        body: ['Inter', '"Avenir Next"', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } }
      }
    }
  },
  plugins: []
};