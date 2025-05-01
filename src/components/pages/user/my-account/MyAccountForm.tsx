'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import Input from '@/components/form/Input'
import SelectInput from '@/components/form/SelectInput'
import Button from '@/components/form/Button'
import { Upload, Phone, MapPin, Home, CreditCard } from 'lucide-react'

type FormData = {
	givenName: string
	surName: string
	gender: string
	mobileNumber: string
	dob: string
	nationality: string
	address: string
	postCode: string
	passportNumber: string
	passportExpiry: string
	passportCopy: File | null
	visaCopy: File | null
}

type Option = {
	value: string
	label: string
}

const genderOptions: Option[] = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'other', label: 'Other' }
]

const nationalityOptions: Option[] = [
	{ value: 'bangladesh', label: 'Bangladesh' },
	{ value: 'india', label: 'India' },
	{ value: 'usa', label: 'USA' }
]

const MyAccountForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		givenName: '',
		surName: '',
		gender: '',
		mobileNumber: '',
		dob: '',
		nationality: '',
		address: '',
		postCode: '',
		passportNumber: '',
		passportExpiry: '',
		passportCopy: null,
		visaCopy: null
	})

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (name: keyof FormData, value: string): void => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, files } = e.target
		if (files && files.length > 0) {
			setFormData(prev => ({ ...prev, [name]: files[0] }))
		}
	}

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault()
		console.log('Submitted:', formData)
		// Add API logic here
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 max-w-4xl bg-white p-4 rounded-lg mx-auto'
		>
			<p className='text-sm'>gausalmunirtushar@gmail.com</p>

			<Button type='button' variant='outline' leftIcon={<Upload />}>
				Upload New Photo
			</Button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<Input
					label='Given Name'
					name='givenName'
					value={formData.givenName}
					onChange={handleInputChange}
				/>
				<Input
					label='Sur Name'
					name='surName'
					value={formData.surName}
					required
					onChange={handleInputChange}
				/>
			</div>

			<SelectInput
				label='Gender'
				options={genderOptions}
				value={formData.gender}
				required
				onChange={val => handleSelectChange('gender', val)}
			/>

			<Input
				label='Mobile Number'
				name='mobileNumber'
				value={formData.mobileNumber}
				onChange={handleInputChange}
				icon={Phone}
			/>

			<Input
				label='Date of Birth'
				type='date'
				name='dob'
				value={formData.dob}
				onChange={handleInputChange}
			/>

			<SelectInput
				label='Nationality'
				options={nationalityOptions}
				value={formData.nationality}
				onChange={val => handleSelectChange('nationality', val)}
			/>

			<Input
				label='Address'
				name='address'
				value={formData.address}
				onChange={handleInputChange}
				icon={Home}
			/>

			<Input
				label='Post Code'
				name='postCode'
				value={formData.postCode}
				onChange={handleInputChange}
				icon={MapPin}
			/>

			<Input
				label='Passport Number'
				name='passportNumber'
				value={formData.passportNumber}
				onChange={handleInputChange}
				icon={CreditCard}
			/>

			<Input
				label='Passport Expiry Date'
				type='date'
				name='passportExpiry'
				value={formData.passportExpiry}
				onChange={handleInputChange}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<label className='text-sm font-medium mb-1 block'>
						Passport Copy (max 2MB)
					</label>
					<input
						type='file'
						name='passportCopy'
						accept='.pdf,.jpg,.png'
						onChange={handleFileChange}
						className='w-full border rounded px-3 py-2 text-sm'
					/>
				</div>
				<div>
					<label className='text-sm font-medium mb-1 block'>
						Visa Copy (max 2MB)
					</label>
					<input
						type='file'
						name='visaCopy'
						accept='.pdf,.jpg,.png'
						onChange={handleFileChange}
						className='w-full border rounded px-3 py-2 text-sm'
					/>
				</div>
			</div>

			<Button type='submit' className='w-full mt-6'>
				Save
			</Button>
		</form>
	)
}

export default MyAccountForm
