'use client'
import HolidayConsultationForm from '@/components/pages/front-pages/holiday/HolidayConsultationForm'
import HolidayDetails from '@/components/pages/front-pages/holiday/HolidayDetails'
import HolidaySlider from '@/components/pages/front-pages/holiday/HolidaySlider'

const HolidayDetailsPage = () => {
	const onSubmit = (data: FormData) => {
		// Handle form submission
		console.log(data)
	}
	return (
		<main className='bg-gray-100'>
			<section className='container mx-auto'>
				<div className='py-6'>
					<HolidaySlider />
				</div>
				<div className='w-full flex bg-white py-3 rounded-t-lg'>
					<div className='w-9/12'>
						<HolidayDetails />
					</div>
					<div className='w-3/12 flex'>
						<HolidayConsultationForm
							onSubmit={data => console.log(data)}
							isLoading={false}
						/>
					</div>
				</div>
			</section>
		</main>
	)
}

export default HolidayDetailsPage
