'use client'

import { useEffect, useState } from 'react'

import { Plus, Trash2, Edit } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

type Visa = {
	_id?: string
	country: string
	countryCode: string
	visaType: string
	visaMode: string
	entryType: string
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	content?: string
}

export default function AdminVisaPage() {
	const [visas, setVisas] = useState<Visa[]>([])
	const [form, setForm] = useState<Visa>({
		country: '',
		countryCode: '',
		visaType: 'Tourist Visa',
		visaMode: 'E-Visa',
		entryType: 'Single Entry',
		processingTime: '45 Working Days',
		visaValidity: '90 Days From Issue',
		maxStay: '60 Days From Entry',
		description: '',
		content: ''
	})
	const [editingId, setEditingId] = useState<string | null>(null)

	const fetchVisas = async () => {
		const res = await fetch('/api/visa')
		const data = await res.json()
		setVisas(data)
	}

	useEffect(() => {
		fetchVisas()
	}, [])

	const handleSubmit = async () => {
		const method = editingId ? 'PUT' : 'POST'
		const url = editingId ? `/api/visa/${editingId}` : `/api/visa`
		await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		})
		setEditingId(null)
		setForm({
			country: '',
			countryCode: '',
			visaType: 'Tourist Visa',
			visaMode: 'E-Visa',
			entryType: 'Single Entry',
			processingTime: '45 Working Days',
			visaValidity: '90 Days From Issue',
			maxStay: '60 Days From Entry',
			description: '',
			content: ''
		})
		await fetchVisas()
	}

	const handleDelete = async (id: string) => {
		await fetch(`/api/visa/${id}`, { method: 'DELETE' })
		await fetchVisas()
	}

	const handleEdit = (visa: Visa) => {
		setForm(visa)
		setEditingId(visa._id || null)
	}

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-2xl font-bold'>Visa Management</h1>

			<div className='grid grid-cols-2 gap-4'>
				<Input
					placeholder='Country'
					value={form.country}
					onChange={e =>
						setForm({ ...form, country: e.target.value })
					}
				/>
				<Input
					placeholder='Country Code'
					value={form.countryCode}
					onChange={e =>
						setForm({ ...form, countryCode: e.target.value })
					}
				/>
				<Input
					placeholder='Processing Time'
					value={form.processingTime}
					onChange={e =>
						setForm({ ...form, processingTime: e.target.value })
					}
				/>
				<Input
					placeholder='Visa Validity'
					value={form.visaValidity}
					onChange={e =>
						setForm({ ...form, visaValidity: e.target.value })
					}
				/>
				<Input
					placeholder='Max Stay'
					value={form.maxStay}
					onChange={e =>
						setForm({ ...form, maxStay: e.target.value })
					}
				/>
			</div>

			<Button onClick={handleSubmit}>
				{editingId ? 'Update Visa' : 'Create Visa'}
			</Button>

			<div className='pt-6'>
				<table className='w-full border text-left text-sm'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='p-2'>Country</th>
							<th className='p-2'>Code</th>
							<th className='p-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{visas.map(visa => (
							<tr key={visa._id} className='border-t'>
								<td className='p-2'>{visa.country}</td>
								<td className='p-2'>{visa.countryCode}</td>
								<td className='p-2 flex gap-2'>
									<Button
										size='sm'
										variant='outline'
										onClick={() => handleEdit(visa)}
									>
										<Edit size={16} />
									</Button>
									<Button
										size='sm'
										variant='danger'
										onClick={() => handleDelete(visa._id!)}
									>
										<Trash2 size={16} />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
