'use client'

import Button from '@/components/form/Button'
import UmrahSearchInput from '@/components/form/input/UmrahSearchInput'
import { Search } from 'lucide-react'
import Link from 'next/link'

export default function UmrahSearch() {
	return (
		<div className='w-full flex gap-4'>
			<UmrahSearchInput label='Destination' value='UM' />
			<Link href={`/umrah`} className='flex'>
				<Button>
					<div className='flex items-center justify-center px-4'>
						<Search size={18} className='' />
					</div>
				</Button>
			</Link>
		</div>
	)
}
