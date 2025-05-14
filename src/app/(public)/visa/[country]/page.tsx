'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import VisaHeader from '@/components/pages/front-pages/visa/VisaHeader'
import VisaAssistanceForm from '@/components/pages/front-pages/visa/VisaAssistanceForm'

export default function VisaDetailPage({
	params
}: {
	params: Promise<{ country: string }>
}) {
	// State to store the resolved params
	const [resolvedParams, setResolvedParams] = useState<{
		country: string
	} | null>(null)

	// State to manage loading state and error state
	const [visa, setVisa] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Resolving the params promise
		params
			.then(resolved => {
				setResolvedParams(resolved)
			})
			.catch(err => {
				console.error('Error resolving params:', err)
				setError('Failed to resolve params')
			})
	}, [params])

	useEffect(() => {
		// Fetching the visa data once params are resolved
		const fetchVisaData = async () => {
			if (resolvedParams?.country) {
				const { country } = resolvedParams
				const baseUrl =
					process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

				// Step 1: Fetch visa data by country slug
				const resSlug = await fetch(
					`${baseUrl}/api/visa/by-country/${country}`,
					{
						cache: 'no-cache'
					}
				)

				if (!resSlug.ok) {
					setError('Visa not found')
					setLoading(false)
					return
				}

				const { _id } = await resSlug.json()

				// Step 2: Fetch visa data by ID
				const res = await fetch(`${baseUrl}/api/visa/${_id}`, {
					cache: 'no-cache'
				})

				if (!res.ok) {
					setError('Failed to fetch visa data')
					setLoading(false)
					return
				}

				const visaData = await res.json()
				setVisa(visaData)
				setLoading(false)
			}
		}

		// Only fetch the visa data if params are resolved
		if (resolvedParams) {
			fetchVisaData()
		}
	}, [resolvedParams])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div className='text-center text-red-500'>{error}</div>
	}

	return (
		<section className=' bg-gray-100'>
			<div className='container mx-auto py-4'>
				<VisaHeader country={visa.country} imageUrl={visa.imageUrl} />
				<div className='w-full flex flex-wrap py-4'>
					<div className='w-full sm:w-9/12'>
						<h1 className='text-3xl font-bold'>
							{visa.country} Visa
						</h1>
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
							<strong>Processing Time:</strong>{' '}
							{visa.processingTime}
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
						<div
							dangerouslySetInnerHTML={{
								__html: visa.content || ''
							}}
						/>
					</div>
					<div className='w-full sm:w-3/12'>
						<VisaAssistanceForm />
					</div>
				</div>
			</div>
		</section>
	)
}
