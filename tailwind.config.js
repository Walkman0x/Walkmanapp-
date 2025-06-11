/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'walkman-yellow': '#FFD700',
        'walkman-orange': '#FF8C00',
        'walkman-red': '#DC143C',
        'walkman-gray': '#2C2C2C',
        'walkman-silver': '#C0C0C0',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'retro': ['Arial', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s infinite',
      },
      boxShadow: {
        'retro': '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'pressed': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}