/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0c',
          card: '#16161a',
          accent: '#00f2ff',
          text: '#e0e0e6',
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      },
    },
  },
  plugins: [],
}
