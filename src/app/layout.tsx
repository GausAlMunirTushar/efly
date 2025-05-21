import '@/styles/globals.scss'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans, Poppins } from 'next/font/google'

import { ToastContextProvider } from '@/contexts/ToastContextProvider'

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
	weight: ['400', '500', '600', '700']
})

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['400', '500', '600', '700']
})

export const metadata = {
	title: 'efly - We Are The New Travel Agency (OTA) in Your City',
	description:
		' efly We Are The New Travel Agency (OTA) in Your City. We Are Committed To Make Your Travel Easier And More Comfortable With World Class Services. '
}

interface LayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<html className={`${openSans.variable} ${poppins.variable}`}>
			<head></head>
			<body>
				<ToastContextProvider>{children}</ToastContextProvider>
			</body>
			<GoogleAnalytics gaId='G-0WL6ZE3TYJ' />
		</html>
	)
}
