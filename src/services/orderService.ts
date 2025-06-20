import apiClient from '@/configs/apiConfig'

export interface OrderPayload {
	customerName: string
	customerEmail: string
	customerPhone: string
	productType: 'flight' | 'visa' | 'holiday' | 'umrah'
	productId: string
	orderStatus?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
	price: number
	paymentStatus?: 'pending' | 'paid' | 'failed'
}

export interface Order extends OrderPayload {
	_id: string
	createdAt: string
	updatedAt: string
}

export const getOrders = async (): Promise<Order[]> => {
	const res = await apiClient.get('/order')
	return res.data
}

export const getOrderById = async (id: string): Promise<Order> => {
	const res = await apiClient.get(`/order/${id}`)
	return res.data
}

export const createOrder = async (data: OrderPayload): Promise<Order> => {
	const res = await apiClient.post('/order', data)
	return res.data
}

export const updateOrder = async (
	id: string,
	data: Partial<OrderPayload>
): Promise<Order> => {
	const res = await apiClient.put(`/order/${id}`, data)
	return res.data
}

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
	const res = await apiClient.delete(`/order/${id}`)
	return res.data
}
