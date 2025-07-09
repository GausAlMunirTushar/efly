'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import HolidayPackageCard from '@/components/pages/front-pages/holiday/HolidayPackageCard'
import { getAllHolidays } from '@/services/holidayService'
import Image from 'next/image'
import Search from '@/components/pages/home/search/Search'

export default function HolidayPageClient() {
	return (
		<main>
			<section
				className=' bg-cover bg-center bg-no-repeat py-14'
				style={{
					backgroundImage: "url('/images/holiday/holiday.jpg')"
				}}
			>
				<Search />
			</section>
		</main>
	)
}
