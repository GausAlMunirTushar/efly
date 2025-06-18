'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Destination {
	id: string
	name: string
}

interface HolidayPackage {
	_id: string
	location: string
	[key: string]: any
}

export default function HolidaySearch() {
	const [destinations, setDestinations] = useState<Destination[]>([])
	const [destination, setDestination] = useState<string>('')
	const router = useRouter()

	useEffect(() => {
		const fetchDestinations = async () => {
			try {
				const res = await fetch('/api/location')
				if (!res.ok) throw new Error('Failed to fetch locations')
				const data: Destination[] = await res.json()

				setDestinations(data)
				if (data.length) setDestination(data[0].id)
			} catch (error) {
				console.error(error)
			}
		}

		fetchDestinations()
	}, [])

	const handleSearch = () => {
		// Navigate to the filtered holiday list page with location query param
		// For example: /holidays?location=selectedDestination
		if (!destination) return

		router.push(`/holiday?location=${encodeURIComponent(destination)}`)
	}

	return (
		<div className='flex gap-4'>
			<SelectSearchInput
				label='Destination'
				value={destination}
				onChange={setDestination}
				options={destinations.map(d => ({
					code: d.id,
					name: d.name
				}))}
			/>

			<div>
				<Button onClick={handleSearch} className=''>
					<div className='px-4 py-2.5'>
						<Search size={20} className='' />
					</div>
				</Button>
			</div>
		</div>
	)
}
