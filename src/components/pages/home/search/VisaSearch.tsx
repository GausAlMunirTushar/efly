'use client'

import Button from '@/components/form/Button'
import SelectSearchInput from '@/components/form/SelectSearchInput'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCountries, Country } from '@/services/countryService'
import { getVisas, Visa } from '@/services/visaService'

type VisaOption = { code: string; name: string }

export default function VisaSearch() {
	const [country, setCountry] = useState<string>('')
	const [options, setOptions] = useState<VisaOption[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchVisaCountries = async () => {
			try {
				const countries: Country[] = await getCountries()
				const mappedCountries = countries.map(c => ({
					name: c.name,
					code: c.countryCode
				}))
				setOptions(mappedCountries)
				setCountry(mappedCountries?.[0]?.code || '')
			} catch (error) {
				console.error('Failed to fetch countries:', error)
			}
		}
		fetchVisaCountries()
	}, [])

	const handleSearch = async () => {
		if (!country) return

		try {
			const visas: Visa[] = await getVisas()
			const matchedVisa = visas.find(
				v => v.country?.countryCode === country
			)

			if (matchedVisa) {
				const slug = matchedVisa.country?.name
					.toLowerCase()
					.replace(/\s+/g, '-') // convert to kebab-case
				router.push(`/visa/${slug}`)
			} else {
				alert('No visa found for the selected country.')
			}
		} catch (err) {
			console.error('Error fetching visas:', err)
		}
	}

	return (
		<section className='w-full flex gap-4'>
			<div className='w-full'>
				<SelectSearchInput
					label='Visa for Country'
					value={country}
					onChange={setCountry}
					options={options}
				/>
			</div>
			<div className='flex'>
				<Button onClick={handleSearch}>
					<div className='px-4'>
						<Search size={20} />
					</div>
				</Button>
			</div>
		</section>
	)
}
