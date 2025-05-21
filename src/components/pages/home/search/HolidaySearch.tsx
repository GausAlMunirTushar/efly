'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Destination {
	code: string
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
				const res = await fetch('/api/holiday')
				if (!res.ok) throw new Error('Failed to fetch holidays')
				const data: HolidayPackage[] = await res.json()

				const uniqueDestinations: Destination[] = Array.from(
					new Map(
						data.map(pkg => [
							pkg.location,
							{ code: pkg.location, name: pkg.location }
						])
					).values()
				)

				setDestinations(uniqueDestinations)
				if (uniqueDestinations.length)
					setDestination(uniqueDestinations[0].code)
			} catch (error) {
				console.error(error)
			}
		}

		fetchDestinations()
	}, [])

	const handleSearch = async () => {
		try {
			const res = await fetch(`/api/holiday?country=${destination}`)
			if (!res.ok) throw new Error('No holiday packages found')
			const results: HolidayPackage[] = await res.json()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			<SelectSearchInput
				label='Destination'
				value={destination}
				onChange={setDestination}
				options={destinations.map(d => ({
					code: d.code,
					name: d.name
				}))}
			/>

			<div className=''>
				<Button className='flex justify-center items-center'>
					<Search size={16} className='mr-2' /> Search Holiday
				</Button>
			</div>
		</div>
	)
}
