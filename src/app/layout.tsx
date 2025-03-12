import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'

import { ToastContextProvider } from '@/contexts/ToastContextProvider'

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
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem={true}
				>
					<ToastContextProvider>{children}</ToastContextProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
