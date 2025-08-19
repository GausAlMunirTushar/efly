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
import Title from '@/components/common/Title'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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

const CreateNewOrderPage = () => {
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
		} catch (err) {
			toast.error('Failed to create order')
		}
	}
	return (
		<section className='p-4 bg-white min-h-screen rounded-lg mx-auto'>
			<div className='flex justify-between items-center mb-4'>
				<Title>Orders</Title>
				<Link href={'/admin/orders'}>
					<Button size='sm'>
						<ArrowLeft size={14} />
					</Button>
				</Link>
			</div>
			<div className='my-4 space-y-2'>
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
		</section>
	)
}

export default CreateNewOrderPage
