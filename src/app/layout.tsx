import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'

import { ToastContextProvider } from '@/contexts/ToastContextProvider'

export const metadata = {
	title: 'efly',
	description: 'efly '
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
