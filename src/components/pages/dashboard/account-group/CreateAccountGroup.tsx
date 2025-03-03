'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

const CreateAccountGroup = () => {
	const [groupName, setGroupName] = useState('')
	const [avatar, setAvatar] = useState<File | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setAvatar(event.target.files[0])
		}
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (!groupName.trim()) {
			alert('Group name is required')
			return
		}
		console.log({ groupName, avatar })
		// Submit logic here
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-6 bg-white dark:bg-bg_dark rounded-lg space-y-4'
		>
			<div>
				<Input
					label='Group Name'
					id='group-name'
					type='text'
					placeholder='Enter Group Name'
					value={groupName}
					onChange={e => setGroupName(e.target.value)}
					className='w-full'
				/>
			</div>
			<div className='flex items-center space-x-3'>
				<label
					htmlFor='avatar'
					className='flex items-center px-4 py-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-bg_dark'
				>
					<Upload className='w-4 h-4 mr-2' />
					<span className='text-primary-600  dark:text-text-primary font-medium'>
						Upload Avatar
					</span>
					<input
						id='avatar'
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleFileChange}
					/>
				</label>
				<span className='text-gray-600'>
					{avatar ? avatar.name : 'No File Chosen'}
				</span>
			</div>
			<Button type='submit' variant='primary' className='w-full'>
				Submit
			</Button>
		</form>
	)
}

export default CreateAccountGroup
