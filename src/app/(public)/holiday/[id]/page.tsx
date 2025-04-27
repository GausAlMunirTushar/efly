'use client'
import HolidayConsultationForm from '@/components/pages/front-pages/holiday/HolidayConsultationForm'

const HolidayPage = () => {
	const onSubmit = (data: FormData) => {
		// Handle form submission
		console.log(data)
	}
	return (
		<section className='container mx-auto'>
			<div></div>
			<div className='w-full flex'>
				<div className='w-9/12'>
					<h1>Hello</h1>
				</div>
				<div className='w-3/12'>
					<HolidayConsultationForm
						onSubmit={data => console.log(data)}
						isLoading={false}
					/>
				</div>
			</div>
		</section>
	)
}

export default HolidayPage
