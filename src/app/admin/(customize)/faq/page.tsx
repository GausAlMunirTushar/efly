'use client'

import React, { useState } from 'react'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Button from '@/components/form/Button'

const TABS = ['Flight', 'Visa', 'Holiday', 'Umrah', 'Hotel']

const AdminFaqPage = () => {
	const [activeTab, setActiveTab] = useState('Flight')

	return (
		<section className='bg-white min-h-screen rounded-lg p-4'>
			<div className='flex justify-between items-center'>
				<Title>FAQ</Title>
				<Link href='/admin/create-faq'>
					<Button size='sm'>Create New FAQ</Button>
				</Link>
			</div>

			{/* Tabs */}
			<div className='mt-4 border-b border-gray-200'>
				<nav className='flex space-x-4'>
					{TABS.map(tab => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-all duration-200 ${
								activeTab === tab
									? 'bg-[#0058A8] text-white'
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
							}`}
						>
							{tab}
						</button>
					))}
				</nav>
			</div>

			{/* Tab Content */}
			<div className='mt-6'>
				{activeTab === 'Flight' && (
					<p>This is the Flight FAQ content.</p>
				)}
				{activeTab === 'Visa' && <p>This is the Visa FAQ content.</p>}
				{activeTab === 'Holiday' && (
					<p>This is the Holiday FAQ content.</p>
				)}
				{activeTab === 'Umrah' && <p>This is the Umrah FAQ content.</p>}
				{activeTab === 'Hotel' && <p>This is the Hotel FAQ content.</p>}
			</div>
		</section>
	)
}

export default AdminFaqPage
