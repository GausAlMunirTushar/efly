'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import VisaHeader from '@/components/pages/front-pages/visa/VisaHeader'
import VisaAssistanceForm from '@/components/pages/front-pages/visa/VisaAssistanceForm'
import { getVisaById, Visa } from '@/services/visaService'

export default function VisaDetailPage() {
	const params = useParams()
	const id =
		typeof params.id === 'string'
			? params.id
			: Array.isArray(params.id)
				? params.id[0]
				: ''

	const [visa, setVisa] = useState<Visa | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!id) {
			setError('Invalid visa ID')
			setLoading(false)
			return
		}

		const fetchVisa = async () => {
			try {
				const visaData = await getVisaById(id)
				setVisa(visaData)
			} catch (err) {
				console.error('Error fetching visa:', err)
				setError('Visa not found')
			} finally {
				setLoading(false)
			}
		}
		fetchVisa()
	}, [id])

	if (loading) return <div className='text-center py-10'>Loading...</div>
	if (error || !visa) return notFound()

	return (
		<section className='bg-gray-100'>
			<div className='max-w-7xl mx-auto pt-4 px-4'>
				<VisaHeader
					country={visa.country.name}
					imageUrl={visa.country.image}
				/>

				<div className='w-full flex flex-col md:flex-row gap-4 py-5'>
					<div className='w-full sm:w-9/12 bg-white rounded-lg p-4'>
						<h1 className='text-3xl font-bold mb-4'>
							{visa.country.name} Visa
						</h1>

						<ul className='space-y-2 text-gray-700'>
							<li>
								<strong>Visa Type:</strong> {visa.visaType}
							</li>
							<li>
								<strong>Visa Mode:</strong>{' '}
								{visa.visaMode || 'N/A'}
							</li>
							<li>
								<strong>Processing Time:</strong>{' '}
								{visa.processingTime}
							</li>
							<li>
								<strong>Visa Validity:</strong>{' '}
								{visa.visaValidity}
							</li>
							<li>
								<strong>Maximum Stay:</strong> {visa.maxStay}
							</li>
							<li>
								<strong>Visa Fee:</strong> BDT{' '}
								{visa.visaFee || '0'}
							</li>
							<li>
								<strong>Service Charge:</strong> BDT{' '}
								{visa.serviceCharge || '0'}
							</li>
							<li>
								<strong>Description:</strong>{' '}
								{visa.description ? (
									<div
										className='prose max-w-none'
										dangerouslySetInnerHTML={{
											__html: visa.description
										}}
									/>
								) : (
									'N/A'
								)}
							</li>
						</ul>
					</div>

					<div className='w-full sm:w-3/12 bg-white rounded-lg'>
						<VisaAssistanceForm visaId={id} />
					</div>
				</div>
			</div>
		</section>
	)
}
