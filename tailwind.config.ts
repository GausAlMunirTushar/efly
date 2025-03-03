import type { Config } from 'tailwindcss'

export default {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				bg_dark: '#2D3247',
				bg_secondary: '#374151',
				body_dark: '#25293C',
				bg_light: '#F7F6F9',
				text: {
					primary: '#E4E7EF',
					secondary: '#A0A3B1',
					muted: '#6D7280',
					dark: '#0F154F',
					link: '#7C82E9',
					highlight: '#FFA07A'
				},
				primary: {
					DEFAULT: '#137EFF',
					50: '#F2F2FB',
					100: '#E1E4FA',
					200: '#BFC3F4',
					300: '#9EA3EF',
					400: '#7C82E9',
					500: '#1C2F96',
					600: '#1A2A87',
					700: '#162373',
					800: '#121B5F',
					900: '#0F154F'
				},
				success: '#1DD1A1',
				warning: '#FFB900',
				danger: '#FF4D4F',
				background: '#0F2454'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')]
} satisfies Config
