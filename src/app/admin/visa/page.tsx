'use client'

import React, { useState, useEffect } from 'react'
import { getVisas, deleteVisa } from '@/services/visaService'
import Button from '@/components/form/Button'
import { Trash2, Edit } from 'lucide-react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Title from '@/components/common/Title'

const VisaPage = () => {
	const [visas, setVisas] = useState<any[]>([])

	useEffect(() => {
		const fetchVisas = async () => {
			try {
				const data = await getVisas()
				setVisas(data)
			} catch (error) {
				toast.error('Error fetching visas.')
			}
		}
		fetchVisas()
	}, [])

	const handleDelete = async (id: string) => {
		if (confirm('Are you sure you want to delete this visa?')) {
			try {
				await deleteVisa(id)
				setVisas(visas.filter(visa => visa._id !== id))
				toast.success('Visa deleted.')
			} catch (error) {
				toast.error('Failed to delete visa.')
			}
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg min-h-screen'>
			<div className='flex items-center justify-between mb-4'>
				<Title>Visas</Title>
				<Link href='/admin/visa/create'>
					<Button size='sm'>Create Visa</Button>
				</Link>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
				{visas.map(visa => (
					<div
						key={visa._id}
						className='bg-white shadow rounded-lg p-4'
					>
						<h3 className='text-lg font-semibold'>
							{visa.visaType}
						</h3>
						<p>{visa.country.name}</p>
						<Button
							size='sm'
							variant='outline'
							className='mr-2'
							onClick={() =>
								(window.location.href = `/admin/visa/edit/${visa._id}`)
							}
						>
							<Edit size={16} />
							Edit
						</Button>
						<Button
							size='sm'
							variant='danger'
							onClick={() => handleDelete(visa._id)}
						>
							<Trash2 size={16} />
							Delete
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}

export default VisaPage
