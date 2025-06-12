import Airlines from '@/components/pages/front-pages/flight/Airlines'
import HolidayHomeSlider from '@/components/pages/front-pages/holiday/HolidayHomeSlider'
import UmrahSlider from '@/components/pages/front-pages/umrah/UmrahSlider'
import Search from '@/components/pages/home/search/Search'
import HomePopularBlog from '@/components/pages/home/HomePopularBlog'
import CustomSlider, { SlideItem } from '@/components/pages/home/Slider'
import VisaSlider from '@/components/pages/front-pages/visa/VisaSlider'

const slides: SlideItem[] = [
	{ id: 1, image: '/images/slider/slide-1.png', link: '/services/1' },
	{ id: 2, image: '/images/slider/slide-2.jpg', link: '/services/2' },
	{ id: 3, image: '/images/slider/slide1.webp', link: '/services/3' },
	{ id: 4, image: '/images/slider/slide2.webp', link: '/services/4' },
	{ id: 5, image: '/images/slider/slide3.webp', link: '/services/5' }
]

const HomePage = () => {
	return (
		<main className=''>
			<section
				className=' bg-cover bg-center bg-no-repeat py-14'
				style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
			>
				<Search />
			</section>
			<section className='container mx-auto my-3'>
				<CustomSlider slides={slides} />
			</section>
			<section className='bg-gray-50'>
				<div className='container mx-auto my-3'>
					<Airlines />
				</div>
			</section>
			<section className='container mx-auto my-3'>
				<h2
					id='holiday-heading'
					className='text-2xl md:text-3xl font-bold my-3  text-gray-800'
				>
					Holiday Packages for You
				</h2>
				<p className='text-gray-600 '>
					{`Plan your perfect escape with efly! Discover top holiday deals for unforgettable international adventures.`}
				</p>
				<HolidayHomeSlider />
			</section>
			<section className='container mx-auto my-3'>
				<h2
					id='holiday-heading'
					className='text-2xl md:text-3xl font-bold my-3  text-gray-800'
				>
					Visa for You
				</h2>
				<p className='text-gray-600 '>
					{`Plan your perfect escape with efly! Discover top holiday deals for unforgettable international adventures.`}
				</p>
				<VisaSlider />
			</section>
			<section className='container mx-auto my-3'>
				<h2
					id='umrah-heading'
					className='text-2xl md:text-3xl font-bold my-3 text-gray-800'
				>
					Peaceful Umrah Journeys for You
				</h2>
				<p className='text-gray-600'>
					Embark on your spiritual journey with eFly. Find the best
					Umrah packages designed for comfort, convenience, and peace
					of mind.
				</p>

				<UmrahSlider />
			</section>

			<section className='container mx-auto my-3'>
				<HomePopularBlog title='Popular Blogs' />
			</section>
		</main>
	)
}

export default HomePage
