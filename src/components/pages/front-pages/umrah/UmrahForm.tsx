'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import Input from '@/components/form/Input'
import SelectInput from '@/components/form/SelectInput'
import Button from '@/components/form/Button'
import { createOrder } from '@/services/orderService'
import { toast } from 'react-toastify'

interface UmrahFormProps {
	isLoading?: boolean
	umrahId: string
}

interface FormData {
	name: string
	email: string
	phone: string
	whatsAppNumber?: string
	countryCode: string
	preferredTravelDate?: Date
	numberOfPeople?: string
	additionalNotes?: string
}

const countryOptions = [
	{ value: '+880', label: '+880' },
	{ value: '+966', label: '+966' },
	{ value: '+971', label: '+971' },
	{ value: '+44', label: '+44' }
]

const UmrahForm: React.FC<UmrahFormProps> = ({ isLoading, umrahId }) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		whatsAppNumber: '',
		countryCode: '+880',
		preferredTravelDate: undefined,
		numberOfPeople: '',
		additionalNotes: ''
	})

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: '' }))
	}

	const handleSelectChange = (value: string): void => {
		setFormData(prev => ({ ...prev, countryCode: value }))
		setErrors(prev => ({ ...prev, countryCode: '' }))
	}

	const handleDateSelect = (date?: Date): void => {
		setFormData(prev => ({ ...prev, preferredTravelDate: date }))
		setShowDatePicker(false)
	}

	const validate = (): boolean => {
		const newErrors: Record<string, string> = {}

		if (!formData.name.trim()) newErrors.firstName = 'Name is required'
		if (!formData.email.trim()) newErrors.email = 'Email is required'
		if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault()
		if (!validate()) return

		try {
			await createOrder({
				customerName: formData.name,
				customerEmail: formData.email,
				customerPhone: formData.phone,
				countryCode: formData.countryCode,
				whatsAppNumber: formData.whatsAppNumber,
				preferredTravelDate: formData.preferredTravelDate,
				additionalNotes: formData.additionalNotes,
				numberOfPeople: formData.numberOfPeople,

				productType: 'umrah',
				productId: umrahId,
				price: 0
			})
			toast.success('Order submitted successfully!')
			// Reset form if needed
		} catch (error) {
			toast.error('Failed to submit order')
			console.error(error)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 bg-white p-3 sm:p-4 rounded-md w-full max-w-md'
		>
			<h1 className='text-md font-bold text-primary'>
				Request Your Umrah Consultation
			</h1>
			<Input
				label='Name'
				placeholder='Name'
				name='name'
				value={formData.name}
				onChange={handleChange}
				error={errors.name}
				required
				fullWidth
			/>
			<Input
				label='Email Address'
				placeholder='Email Address'
				name='email'
				value={formData.email}
				onChange={handleChange}
				error={errors.email}
				required
				type='email'
				fullWidth
			/>
			<div>
				<label className='text-sm font-medium block mb-1'>
					Phone Number <span className='text-red-500'>*</span>
				</label>
				<div className='flex items-center'>
					<SelectInput
						label=''
						options={countryOptions}
						value={formData.countryCode}
						onChange={handleSelectChange}
						fullWidth={false}
					/>
					<Input
						name='phone'
						placeholder='Phone Number'
						value={formData.phone}
						onChange={handleChange}
						error={errors.phone}
						required
						fullWidth
					/>
				</div>
			</div>
			<Input
				label='WhatsApp Number'
				name='whatsAppNumber'
				placeholder='WhatsApp Number (optional)'
				value={formData.whatsAppNumber}
				onChange={handleChange}
				error={errors.whatsAppNumber}
				fullWidth
			/>
			<div>
				<label className='text-sm font-medium block mb-1'>
					Preferred Travel Date
				</label>
				<div
					onClick={() => setShowDatePicker(prev => !prev)}
					className='w-full flex items-center justify-between border border-gray-300 bg-white px-3 py-2 rounded-md text-sm cursor-pointer'
				>
					{formData.preferredTravelDate ? (
						<span>
							{format(formData.preferredTravelDate, 'PPP')}
						</span>
					) : (
						<span className='text-gray-500'>No date selected</span>
					)}
					<CalendarIcon className='h-4 w-4 text-gray-500' />
				</div>
				{showDatePicker && (
					<div className='mt-2 px-2'>
						<DayPicker
							mode='single'
							selected={formData.preferredTravelDate}
							onSelect={handleDateSelect}
						/>
					</div>
				)}
			</div>
			<Input
				label='Number of People'
				name='numberOfPeople'
				placeholder='e.g. 4'
				value={formData.numberOfPeople}
				onChange={handleChange}
				error={errors.numberOfPeople}
				fullWidth
			/>
			<div>
				<label className='text-sm font-medium block mb-1'>
					Additional Notes
				</label>
				<textarea
					name='additionalNotes'
					value={formData.additionalNotes}
					onChange={handleChange}
					rows={3}
					placeholder='Any special requests or notes'
					className='w-full rounded-md border resize-none border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all'
				/>
			</div>
			<Button
				type='submit'
				variant='primary'
				size='md'
				isLoading={isLoading}
				className='w-full'
			>
				Submit
			</Button>
		</form>
	)
}

export default UmrahForm
