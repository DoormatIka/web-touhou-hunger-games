/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        "IBM": ["IBM Plex Mono", "monospace"],
        "lovers": ["Lovers Quarrel", "cursive"],
        "rubik": ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
}

