import React from 'react'
import Image from 'next/image'
import UmrahForm from '@/components/pages/front-pages/umrah/UmrahForm'
import { notFound } from 'next/navigation'
import Head from 'next/head'
import { getUmrahById } from '@/services/umrahService'

interface UmrahPackage {
	_id: string
	packagename: string
	description?: string
	price: number
	duration?: string
	images?: string[]
	includedServices?: string[]
	isFeatured?: boolean
	termsAndConditions?: string
	refundAndReissuePolicy?: string
	pricingDetails?: string
}

interface PageProps {
	params: Promise<{ id: string }>
}

async function fetchUmrahPackage(id: string): Promise<UmrahPackage | null> {
	const packageData = await getUmrahById(id)

	if (!packageData) {
		notFound()
	}
	return packageData
}

const UmrahDetailsPage = async ({ params }: PageProps) => {
	const paramsId = await params
	const packageData = await fetchUmrahPackage(paramsId.id)

	if (!packageData) {
		notFound()
	}

	const {
		packagename,
		description,
		price,
		duration,
		images,
		termsAndConditions,
		refundAndReissuePolicy
	} = packageData

	const imageUrl =
		images && images.length > 0 ? images[0] : '/images/placeholder.webp'

	const handleSubmit = () => {
		console.log('Form submitted')
	}

	return (
		<div className=' bg-gray-100'>
			<Head>
				<title>{packagename} | Umrah Packages</title>
				<meta
					name='description'
					content={
						description || `${packagename} details and booking.`
					}
				/>
				<meta name='robots' content='index, follow' />
			</Head>

			<main className='max-w-7xl mx-auto px-4 py-5'>
				<article>
					<div className='flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden p-3'>
						{/* Left big image */}
						<section
							aria-labelledby='package-image'
							className='w-full md:w-9/12'
						>
							<Image
								src={imageUrl}
								alt={`${packagename} image`}
								width={1200}
								height={480}
								className='w-full h-auto max-h-[24rem] md:max-h-[30rem] rounded-lg object-cover'
								priority
								sizes='(max-width: 768px) 100vw, 50vw'
								style={{ maxWidth: '100%', height: 'auto' }}
							/>
						</section>

						{/* Right smaller images stacked vertically */}
						<aside className='hidden sm:w-3/12 sm:flex flex-col gap-4'>
							{images && images.length > 1
								? images
										.slice(1)
										.map((imgUrl, idx) => (
											<Image
												key={idx}
												src={imgUrl}
												alt={`${packagename} image ${idx + 2}`}
												width={400}
												height={200}
												className='rounded-lg h-28 object-cover'
												priority={idx === 0}
											/>
										))
								: null}
						</aside>
					</div>

					<div className='flex flex-col md:flex-row gap-5 mt-5'>
						<section
							aria-labelledby='package-info'
							className='w-full md:w-9/12 space-y-6  bg-white rounded-lg p-4'
						>
							<header>
								<h1
									id='package-info'
									className='text-2xl  py-2 font-semibold text-gray-800'
								>
									{packagename}
								</h1>
								<div className='flex flex-wrap flex-col sm:flex-row sm:justify-between gap-2'>
									{duration && (
										<p className='text-lg text-gray-600'>
											<strong>Duration:</strong>{' '}
											{duration}
										</p>
									)}
									<p className='text-lg text-gray-700 font-bold'>
										Price: BDT {price.toLocaleString()}
									</p>
								</div>
							</header>

							{description && (
								<section aria-labelledby='description-heading'>
									<h2
										id='description-heading'
										className='text-xl font-semibold text-gray-800'
									>
										Description
									</h2>
									<div
										className='text-gray-700'
										dangerouslySetInnerHTML={{
											__html: description
										}}
									></div>
								</section>
							)}

							{termsAndConditions && (
								<section
									aria-labelledby='terms-conditions-heading'
									className='space-y-2'
								>
									<h2
										id='terms-conditions-heading'
										className='text-xl font-semibold text-gray-800'
									>
										Terms &amp; Conditions
									</h2>
									<p className='text-gray-700'>
										{termsAndConditions}
									</p>
								</section>
							)}

							{refundAndReissuePolicy && (
								<section
									aria-labelledby='refund-policy-heading'
									className='space-y-2'
								>
									<h2
										id='refund-policy-heading'
										className='text-xl font-semibold text-gray-800'
									>
										Refund &amp; Reissue Policy
									</h2>
									<p className='text-gray-700'>
										{refundAndReissuePolicy}
									</p>
								</section>
							)}

							{/* You can add more sections like includedServices, exclusions, etc. here */}
						</section>

						<aside className='w-full md:w-3/12'>
							<UmrahForm />
						</aside>
					</div>
				</article>
			</main>
		</div>
	)
}

export default UmrahDetailsPage
