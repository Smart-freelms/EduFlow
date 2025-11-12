/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
			},
			colors: {
				// Design tokens from specification
				primary: {
					50: '#E6F0FF',
					100: '#CCE0FF',
					500: '#0066FF',
					600: '#0052CC',
					900: '#003D99',
				},
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					500: '#A3A3A3',
					700: '#404040',
					900: '#171717',
				},
				semantic: {
					success: '#10B981',
					warning: '#F59E0B',
					error: '#EF4444',
					info: '#3B82F6',
				},
				background: {
					page: '#FFFFFF',
					surface: '#FAFAFA',
					elevated: '#FFFFFF',
				},
				// Legacy compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#171717',
				},
				muted: {
					DEFAULT: '#FAFAFA',
					foreground: '#404040',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
				},
			},
			spacing: {
				'18': '4.5rem', // 72px
				'128': '32rem', // 512px
			},
			fontSize: {
				'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 72px
				'title': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 48px
				'subtitle': ['2rem', { lineHeight: '1.3' }], // 32px
				'body-large': ['1.25rem', { lineHeight: '1.6' }], // 20px
			},
			boxShadow: {
				card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				modal: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
				button: '0 1px 2px rgba(0, 0, 0, 0.05)',
			},
			borderRadius: {
				button: '12px',
				card: '16px',
				input: '12px',
				modal: '20px',
				image: '16px',
				// Legacy compatibility
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}