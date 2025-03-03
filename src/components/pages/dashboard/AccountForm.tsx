'use client'

import React, { useState } from 'react'
import SelectInput from '@/components/form/SelectInput'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

const accountTypes = [
	{ value: 'savings', label: 'Savings Account' },
	{ value: 'checking', label: 'Checking Account' },
	{ value: 'business', label: 'Business Account' }
]

const accountSubTypes = [
	{ value: 'personal', label: 'Personal' },
	{ value: 'joint', label: 'Joint' },
	{ value: 'corporate', label: 'Corporate' }
]

const AccountForm: React.FC = () => {
	const [accountType, setAccountType] = useState<string>('')
	const [accountSubType, setAccountSubType] = useState<string>('')
	const [accountName, setAccountName] = useState<string>('')
	const [accountNumber, setAccountNumber] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {}

		if (!accountType) newErrors.accountType = 'Account type is required'
		if (!accountSubType)
			newErrors.accountSubType = 'Account sub-type is required'
		if (!accountName.trim())
			newErrors.accountName = 'Account name is required'
		if (!accountNumber.trim())
			newErrors.accountNumber = 'Account number is required'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (validateForm()) {
			console.log('Form submitted:', {
				accountType,
				accountSubType,
				accountName,
				accountNumber,
				description
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className=' space-y-4 p-6 bg-white dark:bg-bg_dark  rounded-lg'
		>
			{/* Account Type */}
			<SelectInput
				label='Account Type'
				options={accountTypes}
				value={accountType}
				onChange={setAccountType}
				placeholder='Select Account Type'
				error={errors.accountType}
				fullWidth
				required
			/>

			{/* Account Sub Type */}
			<SelectInput
				label='Account Sub Type'
				options={accountSubTypes}
				value={accountSubType}
				onChange={setAccountSubType}
				placeholder='Select Account Sub Type'
				error={errors.accountSubType}
				fullWidth
				required
			/>

			{/* Account Name & Account Number */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<Input
					label='Account Name'
					value={accountName}
					onChange={e => setAccountName(e.target.value)}
					placeholder='Enter a Name'
					error={errors.accountName}
					fullWidth
					required
				/>
				<Input
					label='Account Number'
					value={accountNumber}
					onChange={e => setAccountNumber(e.target.value)}
					placeholder='Enter a Number'
					error={errors.accountNumber}
					fullWidth
					required
				/>
			</div>

			{/* Description */}
			<Input
				label='Description'
				value={description}
				onChange={e => setDescription(e.target.value)}
				placeholder='Add a description'
				fullWidth
			/>

			{/* Submit Button */}
			<div className='flex justify-end'>
				<Button>Submit</Button>
			</div>
		</form>
	)
}

export default AccountForm
