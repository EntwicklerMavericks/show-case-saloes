/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: 'var(--color-bg-dark)',
          light: 'var(--color-bg-light)',
          'card-light': 'var(--color-card-light)',
          'card-dark': 'var(--color-card-dark)',
          'on-dark': 'var(--color-text-on-dark)',
          'on-dark-muted': 'var(--color-text-on-dark-muted)',
          'on-light': 'var(--color-text-on-light)',
          'on-light-muted': 'var(--color-text-on-light-muted)',
          accent: {
            DEFAULT: 'var(--color-accent)',
            hover: 'var(--color-accent-hover)',
            text: 'var(--color-accent-text)',
          },
          'border-dark': 'var(--color-border-dark)',
          'border-light': 'var(--color-border-light)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        'theme-btn': 'var(--radius-btn)',
        'theme-card': 'var(--radius-card)',
      },
    },
  },
  plugins: [],
};
