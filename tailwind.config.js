/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Custom retro colors
        retro: {
          darkBlue: '#1A1F2C',
          purple: '#9b87f5',
          darkPurple: '#7E69AB',
          brightPurple: '#8B5CF6',
          pink: '#D946EF',
          red: '#ea384c',
          darkGray: '#222222',
          charcoal: '#403E43',
          black: '#000000e6',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'glitch': {
          '0%': { 
            transform: 'translate(0)' 
          },
          '20%': { 
            transform: 'translate(-5px, 5px)' 
          },
          '40%': { 
            transform: 'translate(-5px, -5px)' 
          },
          '60%': { 
            transform: 'translate(5px, 5px)' 
          },
          '80%': { 
            transform: 'translate(5px, -5px)' 
          },
          '100%': { 
            transform: 'translate(0)' 
          }
        },
        'scanline': {
          '0%': { 
            transform: 'translateY(0px)'
          },
          '100%': { 
            transform: 'translateY(20px)'
          }
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'screen-wipe': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'spin-pixel': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(90deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '75%': { transform: 'rotate(270deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glitch': 'glitch 0.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'screen-wipe': 'screen-wipe 0.5s ease-out',
        'spin-pixel': 'spin-pixel 2s steps(4) infinite',
      },
      boxShadow: {
        'pixel': '5px 5px 0px rgba(0, 0, 0, 0.5)',
        'pixel-sm': '3px 3px 0px rgba(0, 0, 0, 0.5)',
        'pixel-lg': '8px 8px 0px rgba(0, 0, 0, 0.5)',
        'pixel-inner': 'inset 5px 5px 0px rgba(0, 0, 0, 0.5)',
        'pixel-glow': '0 0 10px rgba(155, 135, 245, 0.8)',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'pixel-secondary': ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}