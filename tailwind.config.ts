import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      height: {
        '46': '46rem',
      },
      width: {
        '160': '58rem',
        '120': '48rem'
      },
      colors: {
        'custom-purple-1': '#2C2B38',
        'custom-purple-2': '#3E2E51',
        'text-base': '#4A4C4F',
        'gray-10': '#ECEEF0',
        "gray-20": "#E8E9EB",
        "gray-30": "#E3E4E6",
        "gray-40": "#D7D9DB",
        "gray-50": "#CCCDD0",
        "gray-60": "#B7B9BB",
        "gray-70": "#A1A2A5",
        "gray-80": "#75787A",
        "gray-90": "#4A4C4F",
        "main-base": "#403CE5",
        "main-light": "#E8E8FA",
        "bg-base": "#F8F9FB"

      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;
