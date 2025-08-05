'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import Input from '@/components/form/Input'
import SelectInput from '@/components/form/SelectInput'
import Button from '@/components/form/Button'

const countryOptions = [
	{ value: '+880', label: '+880' },
	{ value: '+1', label: '+1' },
	{ value: '+44', label: '+44' }
]

export default function VisaAssistanceForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		whatsAppNumber: '',
		countryCode: '+880',
		journeyDate: undefined as Date | undefined,
		additionalRequirements: ''
	})

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [formStatus, setFormStatus] = useState<string | null>(null)
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: '' }))
	}

	const handleSelectChange = (value: string) => {
		setFormData(prev => ({ ...prev, countryCode: value }))
		setErrors(prev => ({ ...prev, countryCode: '' }))
	}

	const handleDateSelect = (date?: Date) => {
		setFormData(prev => ({ ...prev, journeyDate: date }))
		setShowDatePicker(false)
	}

	const validateForm = () => {
		const newErrors: Record<string, string> = {}

		if (!formData.name.trim()) newErrors.name = 'Name is required'
		if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
		if (!formData.email.trim()) newErrors.email = 'Email is required'
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = 'Invalid email'

		return newErrors
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const validationErrors = validateForm()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		try {
			console.log(formData)
			setFormStatus('Submitted successfully!')
		} catch (error) {
			setFormStatus('There was an error submitting the form.')
		}
	}

	return (
		<div className='max-w-md mx-auto p-4 bg-white rounded-lg'>
			<h2 className='text-xl mb-2 font-semibold text-center text-indigo-600'>
				Visa Assistance Request
			</h2>
			<p className='text-center text-gray-500 mb-6'>
				Please fill out the form. We’ll contact you shortly.
			</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					name='name'
					label='Name'
					placeholder='Enter your name'
					value={formData.name}
					onChange={handleChange}
					required
					error={errors.name}
					fullWidth
				/>

				<Input
					name='email'
					label='Email Address'
					placeholder='someone@example.com'
					type='email'
					value={formData.email}
					onChange={handleChange}
					error={errors.email}
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
							fullWidth
						/>
					</div>
				</div>

				<Input
					name='whatsAppNumber'
					label='WhatsApp Number (Optional)'
					placeholder='WhatsApp Number'
					value={formData.whatsAppNumber}
					onChange={handleChange}
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
							<span className='text-gray-500'>
								No date selected
							</span>
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

				<Button type='submit' variant='primary' className='w-full'>
					Submit
				</Button>
			</form>

			{formStatus && (
				<div className='mt-4 text-center text-green-500'>
					<p>{formStatus}</p>
				</div>
			)}
		</div>
	)
}
