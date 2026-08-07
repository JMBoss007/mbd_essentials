/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Mirrors src/theme/colors.ts. This config runs in plain Node and
      // cannot import that TS module, so keep these two in sync by hand.
      colors: {
        'mbd-deep-brown': '#1A1412',
        'mbd-plum': '#2A1835',
        'mbd-purple': '#5B3DCC',
        'mbd-lavender': '#B28CFF',
        'mbd-charcoal': '#0E0B10',
        'mbd-background': '#0E0B10',
        'mbd-dark-surface': '#151218',
        'mbd-surface': '#1F1A22',
        'mbd-surface-elevated': '#25202A',
        'mbd-border': '#2E2833',
        'mbd-border-strong': '#44394D',
        'mbd-text': '#F4F2F7',
        'mbd-text-secondary': '#B8B1C1',
        'mbd-text-muted': '#81798B',
        'mbd-disabled': '#625B68',
        'mbd-success': '#22C55E',
        'mbd-warning': '#F59E0B',
        'mbd-error': '#EF4444',
        'mbd-info': '#4EA1FF',
      },
      borderRadius: {
        'mbd-sm': '6px',
        'mbd-md': '10px',
        'mbd-lg': '16px',
        'mbd-xl': '20px',
        'mbd-2xl': '28px',
      },
    },
  },
  plugins: [],
};
