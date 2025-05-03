import UmrahSlider from '@/components/pages/front-pages/umrah/UmrahSlider'
import FlightSearch from '@/components/pages/home/FlightSearch'
import HomePopularBlog from '@/components/pages/home/HomePopularBlog'
import Slider from '@/components/pages/home/Slider'

const HomePage = () => {
	return (
		<main className=''>
			<section
				className=' bg-cover bg-center bg-no-repeat p-4'
				style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
			>
				<FlightSearch />
			</section>
			<section className='container mx-auto my-3'>
				<Slider />
			</section>
			<section className='container mx-auto my-3'>
				<h2
					id='umrah-heading'
					className='text-2xl md:text-3xl font-bold my-6 text-center text-gray-800'
				>
					Umrah Packages
				</h2>
				<UmrahSlider />
			</section>

			<section className='container mx-auto my-3'>
				<HomePopularBlog title='Popular Blogs' />
			</section>
		</main>
	)
}

export default HomePage
