import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/preline/preline.js'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-text-1': 'linear-gradient(to right, #484697, #7976FD)',
				'gradient-text-2': 'linear-gradient(to left, #484697, #7976FD)'
			},
			fontFamily: {
				pretendard: ['Pretendard', 'sans-serif']
			},
			height: {
				'46': '46rem',
				'0.25': '0.0625'
			},
			width: {
				'120': '48rem',
				'160': '58rem',
				'8xl': '90rem'
			},
			colors: {
				'custom-purple-1': '#2C2B38',
				'custom-purple-2': '#3E2E51',
				'text-base': '#4A4C4F',
				'gray-5': '#F6F7F8',
				'gray-10': '#ECEEF0',
				'gray-20': '#E8E9EB',
				'gray-30': '#E3E4E6',
				'gray-40': '#D7D9DB',
				'gray-50': '#CCCDD0',
				'gray-60': '#B7B9BB',
				'gray-70': '#A1A2A5',
				'gray-80': '#75787A',
				'gray-90': '#4A4C4F',
				'main-base': '#403CE5',
				'main-light': '#E8E8FA',
				'bg-base': '#F8F9FB',
				'login-start': '#4C507C',
				'login-middle': '#5C6095',
				'login-end': '#6C71AF',
				'red-warning': '#EF3535',
				'light-blue': '#ECEEF6',
				'green-success': '#07bc0c',
				'title-black': '#1E2124',
				kakao: '#FEE500',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			spacing: {
				'512': '32rem',
				'700': '43.75rem',
				'738': '46.125rem',
				'1/20': '5%',
				'2/20': '10%',
				'3/20': '15%',
				'4/20': '20%',
				'5/20': '25%',
				'6/20': '30%',
				'7/20': '35%',
				'8/20': '40%',
				'9/20': '45%',
				'10/20': '50%',
				'11/20': '55%',
				'12/20': '60%',
				'13/20': '65%',
				'14/20': '70%',
				'15/20': '75%',
				'16/20': '80%',
				'17/20': '85%',
				'18/20': '90%',
				'19/20': '95%'
			},
			boxShadow: {
				customShadow: '0 4px 5px rgba(0, 0, 0, 0.03)',
				'customShadow-up': '0 -4px 15px rgba(0, 0, 0, 0.03)'
			},
			translate: {
				'-100': '-100%'
			},
			animation: {
				logo: 'logo 1s linear infinite',
				float: 'float 3s ease-in-out  infinite'
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
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(120%)',
						opacity: '0'
					}
				},
				float: {
					'0%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					},
					'100%': {
						transform: 'translateY(0px)'
					}
				}
			},
			borderRadius: {
				'2.5xl': '1.25rem',
				'3.5xl': '1.625rem',
				'4xl': '1.75rem',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		require('preline/plugin'),
		require('tailwind-scrollbar-hide'),
		function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
			const newUtilities = {
				'.hover-effect': {
					'@apply transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-main-base hover:bg-main-light hover:shadow-lg':
						{}
				}
			};
			addUtilities(newUtilities);
		},
		require('tailwindcss-animate')
	]
};
export default config;
