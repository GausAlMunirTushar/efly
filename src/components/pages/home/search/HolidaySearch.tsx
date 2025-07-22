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

const slugify = (text: string) =>
	text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -

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
				if (formatted.length) setDestination(formatted[0].name)
			} catch (error) {
				console.error('Failed to fetch destinations', error)
			}
		}

		fetchDestinations()
	}, [])

	const handleChange = (code: string) => {
		const selected = destinations.find(d => d.id === code)
		if (selected) {
			setDestination(selected.name)
		}
	}

	const handleSearch = () => {
		if (!destination) return
		const slug = slugify(destination)
		router.push(`/holiday/${slug}`)
	}

	return (
		<div className='flex gap-4'>
			<SelectSearchInput
				label='Destination'
				value={destinations.find(d => d.name === destination)?.id || ''}
				onChange={handleChange}
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
