'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Button from '@/components/form/Button'
import { ArrowLeft } from 'lucide-react'
import { getVisaById, updateVisa } from '@/services/visaService'
import Input from '@/components/form/Input'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import Title from '@/components/common/Title'
import Link from 'next/link'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

type Country = {
	_id: string
	name: string
	countryCode: string
	image: string
}

type VisaFormState = {
	_id?: string
	country: Country
	countryCode: string
	countryImage: string
	visaType: string
	visaMode: string
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	visaFee?: string
	serviceCharge?: string
}

const VisaEditPage = () => {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()

	const [form, setForm] = useState<VisaFormState>({
		country: { _id: '', name: '', countryCode: '', image: '' },
		countryCode: '',
		countryImage: '',
		visaType: 'Tourist Visa',
		visaMode: 'E-Visa',
		processingTime: '',
		visaValidity: '',
		maxStay: '',
		description: ''
	})

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchVisaData = async () => {
			try {
				if (!id) return
				const visaData = await getVisaById(id)
				setForm({
					country: visaData.country,
					countryCode: visaData.country.countryCode,
					countryImage: visaData.country.image,
					visaType: visaData.visaType,
					visaMode: visaData.visaMode || 'E-Visa',
					processingTime: visaData.processingTime,
					visaValidity: visaData.visaValidity,
					maxStay: visaData.maxStay,
					description: visaData.description || '',
					visaFee: visaData.visaFee || '',
					serviceCharge: visaData.serviceCharge || ''
				})
			} catch (error) {
				toast.error('Error fetching visa details.')
			}
		}
		if (id) fetchVisaData()
	}, [id])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!form.country._id || !form.countryCode || !form.countryImage) {
			toast.error('Please fill country, country code, and image.')
			return
		}

		const visaPayload: VisaFormState = {
			...form,
			country: {
				_id: form.country._id,
				countryCode: form.countryCode,
				image: form.countryImage,
				name: form.country.name // Ensure the country name is also passed
			}
		}

		setLoading(true)
		try {
			await updateVisa(id, visaPayload)
			toast.success('Visa updated successfully!')
			router.push('/admin/visa')
		} catch (error) {
			toast.error('Error updating visa.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg min-h-screen'>
			<div className='flex items-center justify-between mb-4'>
				<Title>Edit Visa</Title>
				<Link href='/admin/visa'>
					<Button size='sm'>
						<ArrowLeft size={16} />
					</Button>
				</Link>
			</div>
			<form onSubmit={handleSubmit} className='space-y-6 mt-4'>
				<Input
					name='country'
					placeholder='Country'
					value={form.country.name}
					onChange={handleInputChange}
				/>
				<Input
					name='visaType'
					placeholder='Visa Type'
					value={form.visaType}
					onChange={handleInputChange}
				/>
				<JoditEditor
					value={form.description || ''}
					onChange={newContent =>
						setForm({ ...form, description: newContent })
					}
				/>
				<Button
					type='submit'
					className='w-full py-3 mt-6'
					disabled={loading}
				>
					{loading ? 'Saving...' : 'Update Visa'}
				</Button>
			</form>
		</div>
	)
}

export default VisaEditPage
