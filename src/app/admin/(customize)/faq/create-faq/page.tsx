'use client'

import React, { useState } from 'react'
import Title from '@/components/common/Title'
import Link from 'next/link'
import Button from '@/components/form/Button'
import { ArrowLeft } from 'lucide-react'

const AdminCreateFaq = () => {
	const [activeTab, setActiveTab] = useState('Flight')

	return (
		<section className='bg-white min-h-screen rounded-lg p-4'>
			<div className='flex justify-between items-center'>
				<Title>Create New FAQ</Title>
				<Link href='/admin/faq'>
					<Button size='sm'>
						<ArrowLeft size={14} />
					</Button>
				</Link>
			</div>
		</section>
	)
}

export default AdminCreateFaq
