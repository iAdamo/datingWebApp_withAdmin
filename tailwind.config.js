/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          customPurple: '#a897ff',
          alot: '#f5f7fa'
        },
        animation: {
          'fade-in': 'fadeIn 1s ease-out both',
          'fade-in-up': 'fadeInUp 1s ease-out both',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
      },
      },
    },
    plugins: [tailwindcss()],
  };
 
  

  