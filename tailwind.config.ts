import type { Config } from 'tailwindcss'
import containerQueries from '@tailwindcss/container-queries'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Design tokens - Luxury color palette
        'deep-black': '#0A0A0A',
        'charcoal': '#1A1A1A',
        'pure-white': '#FFFFFF',
        'platinum': '#E5E5E5',
        'luxury-gold': '#D4AF37',
        'electric-blue': '#00D4FF',
        'quantum-purple': '#8B5CF6',
        'neural-green': '#10B981',
        'plasma-orange': '#F59E0B',
        // Legacy support
        charcoal: '#111111',
        // Semantic colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        muted: 'var(--color-muted)',
      },
      fontSize: {
        // Enhanced typography hierarchy
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '200' }],
        'heading': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '300' }],
        'subheading': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '400' }],
        'executive': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'display': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '100' }],
        'mega': ['8rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '100' }],
      },
      spacing: {
        // Enhanced spacing scale with fluid values
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
      },
      maxWidth: {
        'luxury': '1440px',
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
        '11xl': '112rem',
      },
      animation: {
        // Enhanced animations
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'luxury-pulse': 'luxuryPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'quantum-spin': 'quantumSpin 4s linear infinite',
        'neural-pulse': 'neuralPulse 2s ease-in-out infinite',
        'matrix-rain': 'matrixRain 8s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'particle-flow': 'particleFlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        luxuryPulse: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        quantumSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        neuralPulse: {
          '0%, 100%': { 
            opacity: '0.7',
            transform: 'scale(1)',
            filter: 'brightness(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)',
            filter: 'brightness(1.2)'
          },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        hologram: {
          '0%, 100%': { 
            opacity: '0.8',
            filter: 'blur(0px) hue-rotate(0deg)'
          },
          '50%': { 
            opacity: '1',
            filter: 'blur(1px) hue-rotate(90deg)'
          },
        },
        particleFlow: {
          '0%': { transform: 'translateX(-100px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
        'electric-gradient': 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
        'quantum-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)',
        'neural-gradient': 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)',
        'plasma-gradient': 'linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #FB923C 100%)',
        'matrix-gradient': 'linear-gradient(180deg, transparent 0%, #10B981 50%, transparent 100%)',
      },
      backdropBlur: {
        'luxury': '24px',
        'quantum': '32px',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'luxury-hover': '0 35px 60px -12px rgba(0, 0, 0, 0.9)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.4)',
        'electric-glow': '0 0 30px rgba(0, 212, 255, 0.4)',
        'quantum-glow': '0 0 40px rgba(139, 92, 246, 0.5)',
        'neural-glow': '0 0 40px rgba(16, 185, 129, 0.5)',
        'plasma-glow': '0 0 40px rgba(245, 158, 11, 0.5)',
        'hologram-shadow': '0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 60px rgba(139, 92, 246, 0.2)',
      },
      blur: {
        'xs': '2px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'quantum': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'neural': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    containerQueries,
  ],
}
export default config 