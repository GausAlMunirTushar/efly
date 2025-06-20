'use client'

import { useEffect, useState } from 'react'
import {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
	CreateUserPayload
} from '@/services/userService'

import { toast } from 'react-toastify'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

interface User {
	_id: string
	name: string
	email: string
	phone: string
	role: 'admin' | 'editor' | 'user'
}

const CustomersPage = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [newUser, setNewUser] = useState<CreateUserPayload>({
		name: '',
		email: '',
		phone: '',
		password: '',
		role: 'user'
	})

	const fetchUsers = async () => {
		setLoading(true)
		try {
			const data = await getUsers()
			setUsers(data)
		} catch (err: any) {
			setError(err.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

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
			fetchUsers()
		} catch (err) {
			toast.error('Failed to create user')
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await deleteUser(id)
			toast.success('User deleted')
			fetchUsers()
		} catch {
			toast.error('Failed to delete user')
		}
	}

	return (
		<div className='p-6 max-w-4xl mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Customer Management</h1>

			<div className='mb-6 space-y-2'>
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
					className='border px-2 py-1 rounded w-full'
				>
					<option value='user'>User</option>
					<option value='editor'>Editor</option>
					<option value='admin'>Admin</option>
				</select>
				<Button onClick={handleCreate}>Add Customer</Button>
			</div>

			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className='text-red-500'>{error}</p>
			) : (
				<table className='w-full border border-gray-200 rounded'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='text-left px-4 py-2'>Name</th>
							<th className='text-left px-4 py-2'>Email</th>
							<th className='text-left px-4 py-2'>Phone</th>
							<th className='text-left px-4 py-2'>Role</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id} className='border-t'>
								<td className='px-4 py-2'>{user.name}</td>
								<td className='px-4 py-2'>{user.email}</td>
								<td className='px-4 py-2'>{user.phone}</td>
								<td className='px-4 py-2 capitalize'>
									{user.role}
								</td>
								<td className='px-4 py-2'>
									<Button
										variant='danger'
										size='sm'
										onClick={() => handleDelete(user._id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default CustomersPage
