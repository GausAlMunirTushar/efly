import { notFound } from 'next/navigation'
import HolidaySlider from '@/components/pages/front-pages/holiday/HolidaySlider'
import HolidayDetails from '@/components/pages/front-pages/holiday/HolidayDetails'
import HolidayConsultationForm from '@/components/pages/front-pages/holiday/HolidayConsultationForm'
import { Metadata } from 'next'
import { getHolidayById } from '@/services/holidayService'

export async function generateMetadata({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	try {
		const { id } = await params
		const pkg = await getHolidayById(id)

		return {
			title: `${pkg.title} | bijoyAir Travel`,
			description:
				pkg.description ||
				'Explore this exclusive holiday package on bijoyAir.',
			openGraph: {
				title: `${pkg.title} | bijoyAir Travel`,
				description:
					pkg.description ||
					'Explore this exclusive holiday package on bijoyAir.',
				images: [pkg.imageUrl],
				type: 'website',
				url: `${process.env.NEXT_PUBLIC_APP_URL}/holiday/${id}`
			}
		}
	} catch {
		return {
			title: 'Holiday Package | bijoyAir Travel',
			description: 'Explore our holiday packages.'
		}
	}
}

export default async function HolidayDetailsPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	try {
		const pkg = await getHolidayById(id)
		const cleanTags =
			Array.isArray(pkg.tags) && pkg.tags.length
				? pkg.tags.filter((t: string) => t.trim() !== '')
				: []

		const cleanedPkg = { ...pkg, tags: cleanTags }

		return (
			<main className='bg-gray-100'>
				<section className='max-w-7xl mx-auto p-4'>
					<div className='pb-4'>
						<HolidaySlider
							images={[cleanedPkg.imageUrl]}
							packageDetails={cleanedPkg}
						/>
					</div>

					<div className='w-full flex flex-col md:flex-row gap-4'>
						<div className='w-full md:w-9/12 bg-white p-3 rounded-lg'>
							<HolidayDetails packageDetails={cleanedPkg} />
						</div>
						<div className='w-full md:w-3/12 flex bg-white p-3 rounded-lg'>
							<HolidayConsultationForm
								isLoading={false}
								holidayId={id}
							/>
						</div>
					</div>
				</section>
			</main>
		)
	} catch (error) {
		console.error('Holiday details error:', error)
		notFound()
	}
}
