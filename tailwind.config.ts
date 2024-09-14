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
        'gradient-text-1': 'linear-gradient(to right, #484697, #7976FD)',
        'gradient-text-2': 'linear-gradient(to left, #484697, #7976FD)',

      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      height: {
        '46': '46rem',
        '0.25': '0.0625'
      },
      width: {
        '160': '58rem',
        '120': '48rem'
      },
      colors: {
        'custom-purple-1': '#2C2B38',
        'custom-purple-2': '#3E2E51',
        'text-base': '#4A4C4F',
        "gray-5": "#F6F7F8",
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
        "bg-base": "#F8F9FB",
        'login-start': '#4C507C',
        'login-middle': '#5C6095',
        'login-end': '#6C71AF',
        'red-warning': '#EF3535',
        'light-blue': '#ECEEF6',
        'green-success': '#07bc0c'

      },
      spacing: {
        '738': '46.125rem',
        '512': '32rem',
        '1/10':'10%',
        '2/10':'20%',
        '3/10':'30%',
        '4/10':'40%',
        '5/10':'50%',
        '6/10':'60%',
        '7/10':'70%',
        '8/10':'80%',
        '9/10':'90%',
      },
      boxShadow: {
        customShadow: '0 4px 5px rgba(0, 0, 0, 0.06)',
      },
      translate: {
        '-100': '-100%',

      },
      animation: {
        logo: 'logo 1s linear infinite',
      },
      keyframes: {
        logo: {
          '0%': {
            transform: 'translateX(0)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%':{
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(120%)',
            opacity: '0'
          },
        },
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
