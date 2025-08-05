'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import Input from '@/components/form/Input'
import SelectInput from '@/components/form/SelectInput'
import Button from '@/components/form/Button'

interface HolidayConsultationFormProps {
	isLoading?: boolean
}

interface FormData {
	name: string
	email: string
	phone: string
	whatsAppNumber?: string
	countryCode: string
	journeyDate?: Date
	additionalRequirements?: string
}

const countryOptions = [
	{ value: '+880', label: '+880' },
	{ value: '+1', label: '+1' },
	{ value: '+44', label: '+44' }
]

const HolidayConsultationForm: React.FC<HolidayConsultationFormProps> = ({
	isLoading
}) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		whatsAppNumber: '',
		countryCode: '+880',
		journeyDate: undefined,
		additionalRequirements: ''
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
		setFormData(prev => ({ ...prev, journeyDate: date }))
		setShowDatePicker(false)
	}

	const validate = (): boolean => {
		const newErrors: Record<string, string> = {}

		if (!formData.name.trim())
			newErrors.name = 'The first name field is required'
		if (!formData.email.trim())
			newErrors.email = 'The email address field is required'
		if (!formData.phone.trim())
			newErrors.phone = 'The phone number field is required'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (validate()) {
			// onSubmit(formData)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 bg-white p-4 rounded-md  w-full max-w-md'
		>
			<h1 className='text-md font-bold text-primary'>
				Get Free Holiday Consultation
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

			<div className=''>
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
				name='whatsAppNumber (optional)'
				placeholder='WhatsApp Number'
				value={formData.whatsAppNumber}
				onChange={handleChange}
				error={errors.whatsAppNumber}
				fullWidth
			/>
			<div>
				<label className='text-sm font-medium block mb-1'>
					Preferred Journey Date{' '}
					<span className='text-red-500'>*</span>
				</label>
				<div
					onClick={() => setShowDatePicker(prev => !prev)}
					className='w-full flex items-center justify-between border border-gray-300 bg-white px-3 py-2 rounded-md text-sm cursor-pointer'
				>
					{formData.journeyDate ? (
						<span>{format(formData.journeyDate, 'PPP')}</span>
					) : (
						<span className='text-gray-500'>No date selected</span>
					)}
					<CalendarIcon className='h-4 w-4 text-gray-500' />
				</div>
				{showDatePicker && (
					<div className='mt-2'>
						<DayPicker
							mode='single'
							selected={formData.journeyDate}
							onSelect={handleDateSelect}
						/>
					</div>
				)}
			</div>

			<div>
				<label className='text-sm font-medium block mb-1'>
					Additional Requirements
				</label>
				<textarea
					name='additionalRequirements'
					value={formData.additionalRequirements}
					onChange={handleChange}
					rows={3}
					placeholder='Additional Requirements'
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

export default HolidayConsultationForm
