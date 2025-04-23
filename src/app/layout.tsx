import '@/styles/globals.scss'
import { GoogleAnalytics } from '@next/third-parties/google'

import { ToastContextProvider } from '@/contexts/ToastContextProvider'
import Script from 'next/script'

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
		<html>
			<head></head>
			<body>
				<ToastContextProvider>{children}</ToastContextProvider>
			</body>
			<GoogleAnalytics gaId='G-0WL6ZE3TYJ' />
		</html>
	)
}
