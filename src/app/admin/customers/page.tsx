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
import Button from '@/components/form/Button'
import Title from '@/components/common/Title'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

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
		<div className='p-4 bg-white min-h-screen mx-auto rounded-lg'>
			<div className='flex justify-between items-center mb-4'>
				<Title>Customers</Title>
				<Link href={'/admin/customers/create-customer'}>
					<Button size='sm'>Create new Customer</Button>
				</Link>
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
										<Trash2 size={16} className='mr-2' />
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
