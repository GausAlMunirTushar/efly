'use client'
import { useState, useEffect } from 'react'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { getHolidayById, updateHoliday } from '@/services/holidayService'

const HolidayPackageEditPage = () => {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()

	const [form, setForm] = useState({
		title: '',
		price: '',
		description: '',
		location: '',
		tags: [],
		imageUrl: ''
	})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (id) {
			fetchHoliday(id)
		}
	}, [id])

	const fetchHoliday = async (id: string) => {
		try {
			const data = await getHolidayById(id)
			setForm({
				title: data.title,
				price: data.price.toString(),
				description: data.description,
				location: data.location,
				tags: data.tags,
				imageUrl: data.imageUrl
			})
		} catch (error) {
			toast.error('Failed to load holiday package details.')
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setLoading(true)

		try {
			await updateHoliday(id, form)
			toast.success('Holiday package updated successfully!')
			router.push('/admin/holiday')
		} catch (error) {
			toast.error('Failed to update holiday package.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg'>
			<h2 className='text-xl font-semibold'>Edit Holiday Package</h2>
			<form onSubmit={handleSubmit}>
				<Input
					name='title'
					placeholder='Title'
					value={form.title}
					onChange={handleInputChange}
					required
				/>
				<Input
					name='price'
					type='number'
					placeholder='Price'
					value={form.price}
					onChange={handleInputChange}
					required
				/>
				<Input
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleInputChange}
				/>

				<Button type='submit' disabled={loading}>
					{loading ? 'Saving...' : 'Update Package'}
				</Button>
			</form>
		</div>
	)
}

export default HolidayPackageEditPage
