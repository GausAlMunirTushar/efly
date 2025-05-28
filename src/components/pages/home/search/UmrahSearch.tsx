'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const destinations = [{ code: 'UM', name: 'Umrah' }]

export default function UmrahSearch() {
	const [destination, setDestination] = useState<string>('TH')

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<SelectSearchInput
				label='Destination'
				value={destination}
				onChange={setDestination}
				options={destinations}
			/>
			<Link href={`/umrah`} className='flex items-end justify-end'>
				<Button className=''>
					<Search size={16} className='mr-2' /> Search Umrah
				</Button>
			</Link>
		</div>
	)
}
