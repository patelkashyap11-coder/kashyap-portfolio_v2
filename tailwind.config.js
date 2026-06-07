/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F2F2EF',
        accent: '#C7E200',
        dark: '#0A0A0A',
        muted: '#6B6B6B',
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'inter-tight': ['var(--font-inter-tight)', 'sans-serif'],
        'cormorant': ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
}
