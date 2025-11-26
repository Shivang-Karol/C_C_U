/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        slateDepth: '#080f1a',
        panelNight: '#0f1724',
        amberCommand: '#00c8ff',
        oliveAux: '#18c0a6',
        dangerAlert: '#ef4444',
        textNeutral: '#f5f7fb',
      },
      fontSize: {
        xs: ['0.75rem', '1.15rem'],
        sm: ['0.875rem', '1.3rem'],
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
      },
      boxShadow: {
        command: '0 10px 40px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
