import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505', // Tam siyah arka plan
        surface: '#111111',    // Kartlar ve yüzeyler için hafif gri-siyah
        primary: '#00FF88',    // Parlak neon yeşil
        danger: '#FF3B3B',     // Uyarılar için kırmızı
      },
    },
  },
  plugins: [],
};
export default config;
