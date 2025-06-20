'use client'

import { useEffect, useState } from 'react'
import {
	getOrders,
	createOrder,
	deleteOrder,
	updateOrder
} from '@/services/orderService'
import { toast } from 'react-toastify'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

interface Order {
	_id: string
	customerName: string
	customerEmail: string
	customerPhone: string
	productType: 'flight' | 'visa' | 'holiday' | 'umrah'
	productId: string
	orderStatus?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
	price: number
	paymentStatus?: 'pending' | 'paid' | 'failed'
}

const OrdersPage = () => {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [newOrder, setNewOrder] = useState<Omit<Order, '_id'>>({
		customerName: '',
		customerEmail: '',
		customerPhone: '',
		productType: 'flight',
		productId: '',
		orderStatus: 'pending',
		price: 0,
		paymentStatus: 'pending'
	})

	const fetchOrders = async () => {
		setLoading(true)
		try {
			const data = await getOrders()
			setOrders(data)
		} catch (err: any) {
			setError(err.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	const handleCreate = async () => {
		try {
			await createOrder(newOrder)
			toast.success('Order created')
			setNewOrder({
				customerName: '',
				customerEmail: '',
				customerPhone: '',
				productType: 'flight',
				productId: '',
				orderStatus: 'pending',
				price: 0,
				paymentStatus: 'pending'
			})
			fetchOrders()
		} catch (err) {
			toast.error('Failed to create order')
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await deleteOrder(id)
			toast.success('Order deleted')
			fetchOrders()
		} catch {
			toast.error('Failed to delete order')
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Order Management</h1>

			<div className='mb-6 space-y-2'>
				<Input
					placeholder='Customer Name'
					value={newOrder.customerName}
					onChange={e =>
						setNewOrder({
							...newOrder,
							customerName: e.target.value
						})
					}
				/>
				<Input
					placeholder='Email'
					value={newOrder.customerEmail}
					onChange={e =>
						setNewOrder({
							...newOrder,
							customerEmail: e.target.value
						})
					}
				/>
				<Input
					placeholder='Phone'
					value={newOrder.customerPhone}
					onChange={e =>
						setNewOrder({
							...newOrder,
							customerPhone: e.target.value
						})
					}
				/>
				<Input
					placeholder='Product ID'
					value={newOrder.productId}
					onChange={e =>
						setNewOrder({ ...newOrder, productId: e.target.value })
					}
				/>
				<Input
					placeholder='Price'
					type='number'
					value={newOrder.price}
					onChange={e =>
						setNewOrder({
							...newOrder,
							price: Number(e.target.value)
						})
					}
				/>
				<select
					value={newOrder.productType}
					onChange={e =>
						setNewOrder({
							...newOrder,
							productType: e.target.value as Order['productType']
						})
					}
					className='border px-2 py-1 rounded w-full'
				>
					<option value='flight'>Flight</option>
					<option value='visa'>Visa</option>
					<option value='holiday'>Holiday</option>
					<option value='umrah'>Umrah</option>
				</select>
				<select
					value={newOrder.orderStatus}
					onChange={e =>
						setNewOrder({
							...newOrder,
							orderStatus: e.target.value as Order['orderStatus']
						})
					}
					className='border px-2 py-1 rounded w-full'
				>
					<option value='pending'>Pending</option>
					<option value='confirmed'>Confirmed</option>
					<option value='cancelled'>Cancelled</option>
					<option value='completed'>Completed</option>
				</select>
				<select
					value={newOrder.paymentStatus}
					onChange={e =>
						setNewOrder({
							...newOrder,
							paymentStatus: e.target
								.value as Order['paymentStatus']
						})
					}
					className='border px-2 py-1 rounded w-full'
				>
					<option value='pending'>Pending</option>
					<option value='paid'>Paid</option>
					<option value='failed'>Failed</option>
				</select>
				<Button onClick={handleCreate}>Create Order</Button>
			</div>

			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className='text-red-500'>{error}</p>
			) : (
				<table className='w-full border border-gray-200 rounded'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='px-4 py-2 text-left'>Customer</th>
							<th className='px-4 py-2 text-left'>Product</th>
							<th className='px-4 py-2 text-left'>Price</th>
							<th className='px-4 py-2 text-left'>Status</th>
							<th className='px-4 py-2 text-left'>Payment</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order._id} className='border-t'>
								<td className='px-4 py-2'>
									<div className='font-semibold'>
										{order.customerName}
									</div>
									<div className='text-sm text-gray-500'>
										{order.customerEmail}
									</div>
									<div className='text-sm text-gray-500'>
										{order.customerPhone}
									</div>
								</td>
								<td className='px-4 py-2'>
									{order.productType}
								</td>
								<td className='px-4 py-2'>৳{order.price}</td>
								<td className='px-4 py-2'>
									{order.orderStatus}
								</td>
								<td className='px-4 py-2'>
									{order.paymentStatus}
								</td>
								<td className='px-4 py-2'>
									<Button
										variant='danger'
										size='sm'
										onClick={() => handleDelete(order._id)}
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

export default OrdersPage
