import Footer from '@/components/layouts/Footer'
import HomeNavbar from '@/components/layouts/HomeNavbar'

export default function WebLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className=''>
			<header>
				<HomeNavbar />
			</header>
			<main className='container mx-auto'>{children}</main>
			<Footer />
		</section>
	)
}
