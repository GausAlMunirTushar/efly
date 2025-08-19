'use client'

import { useEffect, useState } from 'react'
import { getOrders, deleteOrder } from '@/services/orderService'
import { toast } from 'react-toastify'
import Button from '@/components/form/Button'
import Title from '@/components/common/Title'
import Link from 'next/link'

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
		<div className='p-4 bg-white min-h-screen rounded-lg mx-auto'>
			<div className='flex justify-between items-center mb-4'>
				<Title>Orders</Title>
				<Link href={'/admin/orders/create-order'}>
					<Button size='sm'>Create new Order</Button>
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
