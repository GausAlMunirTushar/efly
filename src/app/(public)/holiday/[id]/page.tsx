import { notFound } from 'next/navigation'
import HolidaySlider from '@/components/pages/front-pages/holiday/HolidaySlider'
import HolidayDetails from '@/components/pages/front-pages/holiday/HolidayDetails'
import HolidayConsultationForm from '@/components/pages/front-pages/holiday/HolidayConsultationForm'
import { Metadata } from 'next'

interface HolidayDetailsPageProps {
	params: {
		id: string
	}
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/holiday/${id}`,
		{ cache: 'no-store' }
	)
	if (!res.ok) return {}
	const pkg = await res.json()

	return {
		title: `${pkg.title} | eFly Travel`,
		description:
			pkg.description || 'Explore this exclusive holiday package on eFly.'
	}
}

export default async function HolidayDetailsPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/holiday/${id}`,
		{ cache: 'no-store' }
	)

	if (!res.ok) notFound()

	const pkg = await res.json()

	return (
		<main className='bg-gray-100'>
			<section className='container mx-auto'>
				<div className='py-6'>
					<HolidaySlider
						images={[pkg.imageUrl]}
						packageDetails={pkg}
					/>
				</div>

				<div className='w-full flex bg-white py-3 rounded-t-lg'>
					<div className='w-full md:w-9/12'>
						<HolidayDetails />
					</div>
					<div className='w-full md:w-3/12 flex'>
						<HolidayConsultationForm isLoading={false} />
					</div>
				</div>
			</section>
		</main>
	)
}
