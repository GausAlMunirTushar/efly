import FlightSearch from '@/components/pages/home/FlightSearch'
import Slider from '@/components/pages/home/Slider'

const HomePage = () => {
	return (
		<section className=''>
			<div
				className=' bg-cover bg-center bg-no-repeat p-4'
				style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
			>
				<FlightSearch />
			</div>
			<div className='container mx-auto my-3'>
				<Slider />
			</div>
		</section>
	)
}

export default HomePage
