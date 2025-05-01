import MessageButton from '@/components/form/MessageButton'
import WhatsAppButton from '@/components/form/WhatsAppButton'
import Footer from '@/components/layouts/Footer'
import HomeNavbar from '@/components/layouts/HomeNavbar'

export default function WebLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className=''>
			<header className='sticky top-0 z-10'>
				<HomeNavbar />
			</header>
			<main className=''>{children}</main>
			<footer className=''>
				<WhatsAppButton />
				<MessageButton />
				<Footer />
			</footer>
		</section>
	)
}
