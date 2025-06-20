'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import { getAllLocations } from '@/services/locationService'

interface Destination {
	id: string
	name: string
}

export default function HolidaySearch() {
	const [destinations, setDestinations] = useState<Destination[]>([])
	const [destination, setDestination] = useState<string>('')
	const router = useRouter()

	useEffect(() => {
		const fetchDestinations = async () => {
			try {
				const data = await getAllLocations()

				// Convert _id to id to match the expected structure
				const formatted = data.map((loc: any) => ({
					id: loc._id,
					name: loc.name
				}))

				setDestinations(formatted)
				if (formatted.length) setDestination(formatted[0].id)
			} catch (error) {
				console.error('Failed to fetch destinations', error)
			}
		}

		fetchDestinations()
	}, [])

	const handleSearch = () => {
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
				<Button onClick={handleSearch}>
					<div className='px-4 py-2.5'>
						<Search size={20} />
					</div>
				</Button>
			</div>
		</div>
	)
}
