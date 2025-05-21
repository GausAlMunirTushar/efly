'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type VisaOption = { code: string; name: string }

export default function VisaSearch() {
	const [country, setCountry] = useState<string>('')
	const [options, setOptions] = useState<VisaOption[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchVisaCountries = async () => {
			const res = await fetch('/api/visa')
			const data = await res.json()
			const countries = data.map((visa: any) => ({
				name: visa.country,
				code: visa.countryCode
			}))
			setOptions(countries)
			setCountry(countries?.[0]?.code || '')
		}
		fetchVisaCountries()
	}, [])

	const handleSearch = () => {
		if (country) {
			const selectedCountry = options.find(opt => opt.code === country)
			if (selectedCountry) {
				const slug = selectedCountry.name
					.toLowerCase()
					.replace(/\s+/g, '-')
				router.push(`/visa/${slug}`)
			}
		}
	}

	return (
		<section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<div>
				<SelectSearchInput
					label='Visa for Country'
					value={country}
					onChange={setCountry}
					options={options}
				/>
			</div>
			<div className='flex items-end justify-end'>
				<Button className='' onClick={handleSearch}>
					<Search size={20} className='mr-2' /> Search Visa
				</Button>
			</div>
		</section>
	)
}
