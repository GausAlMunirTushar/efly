import { notFound } from 'next/navigation'

export default async function VisaDetailPage({
	params
}: {
	params: { country: string }
}) {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

	// Step 1: Get visa by country slug
	const resSlug = await fetch(
		`${baseUrl}/api/visa/by-country/${params.country}`,
		{ cache: 'no-cache' }
	)

	if (!resSlug.ok) return notFound()

	const { _id } = await resSlug.json()

	// Step 2: Now fetch by ID (reliable and safe)
	const res = await fetch(`${baseUrl}/api/visa/${_id}`, {
		cache: 'no-cache'
	})

	if (!res.ok) return notFound()

	const visa = await res.json()

	return (
		<div className='p-6 space-y-4'>
			<h1 className='text-3xl font-bold'>{visa.country} Visa</h1>
			<p>
				<strong>Visa Type:</strong> {visa.visaType}
			</p>
			<p>
				<strong>Visa Mode:</strong> {visa.visaMode}
			</p>
			<p>
				<strong>Entry Type:</strong> {visa.entryType}
			</p>
			<p>
				<strong>Processing Time:</strong> {visa.processingTime}
			</p>
			<p>
				<strong>Visa Validity:</strong> {visa.visaValidity}
			</p>
			<p>
				<strong>Maximum Stay:</strong> {visa.maxStay}
			</p>
			<p>
				<strong>Description:</strong> {visa.description}
			</p>
			<div dangerouslySetInnerHTML={{ __html: visa.content || '' }} />
		</div>
	)
}
