'use client'

import { useState } from 'react'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'
import { toast } from 'react-toastify'
import { createUser, CreateUserPayload } from '@/services/userService'
import Title from '@/components/common/Title'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const CreateNewCustomer = () => {
	const [newUser, setNewUser] = useState<CreateUserPayload>({
		name: '',
		email: '',
		phone: '',
		password: '',
		role: 'user'
	})

	const handleCreate = async () => {
		if (!newUser.name || !newUser.email || !newUser.password) {
			toast.error('Name, email, and password are required')
			return
		}
		try {
			await createUser(newUser)
			toast.success('User created')
			setNewUser({
				name: '',
				email: '',
				phone: '',
				password: '',
				role: 'user'
			})
		} catch (err) {
			toast.error('Failed to create user')
		}
	}
	return (
		<section className='p-4 bg-white min-h-screen mx-auto rounded-lg'>
			<div className='flex justify-between items-center mb-4'>
				<Title>Create New Customer</Title>
				<Link href={'/admin/customers'}>
					<Button size='sm'>
						<ArrowLeft size={14} />
					</Button>
				</Link>
			</div>
			<div className='my-4 space-y-2'>
				<Input
					placeholder='Name'
					value={newUser.name}
					onChange={e =>
						setNewUser({ ...newUser, name: e.target.value })
					}
				/>
				<Input
					placeholder='Email'
					value={newUser.email}
					onChange={e =>
						setNewUser({ ...newUser, email: e.target.value })
					}
				/>
				<Input
					placeholder='Phone'
					value={newUser.phone}
					onChange={e =>
						setNewUser({ ...newUser, phone: e.target.value })
					}
				/>
				<Input
					placeholder='Password'
					type='password'
					value={newUser.password}
					onChange={e =>
						setNewUser({ ...newUser, password: e.target.value })
					}
				/>
				<select
					value={newUser.role}
					onChange={e =>
						setNewUser({
							...newUser,
							role: e.target.value as 'admin' | 'editor' | 'user'
						})
					}
					className='border px-2 py-1.5 rounded-lg w-full'
				>
					<option value='user'>User</option>
					<option value='editor'>Editor</option>
					<option value='admin'>Admin</option>
				</select>
				<Button onClick={handleCreate}>Add Customer</Button>
			</div>
		</section>
	)
}

export default CreateNewCustomer
