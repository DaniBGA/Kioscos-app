import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c2050',
        secondary: '#4caf82',
        accent: '#2d3561',
        danger: '#e74c3c',
        warning: '#f39c12',
        success: '#27ae60',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
