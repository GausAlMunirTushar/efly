import Airlines from '@/components/pages/front-pages/flight/Airlines'
import Search from '@/components/pages/home/search/Search'

const FlightPage = () => {
	return (
		<section>
			<section
				className=' bg-cover bg-center bg-no-repeat py-14'
				style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
			>
				<Search />
			</section>
			<Airlines />
		</section>
	)
}

export default FlightPage
