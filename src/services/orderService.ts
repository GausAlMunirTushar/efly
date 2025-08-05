import apiClient from '@/configs/apiConfig'

export interface OrderPayload {
	customerName: string
	customerEmail: string
	customerPhone: string
	countryCode?: string
	whatsAppNumber?: string
	preferredTravelDate?: Date
	additionalNotes?: string
	numberOfPeople?: string

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
	const res = await apiClient.get('/orders')
	return res.data
}

export const getOrderById = async (id: string): Promise<Order> => {
	const res = await apiClient.get(`/orders/${id}`)
	return res.data
}

export const createOrder = async (data: OrderPayload): Promise<Order> => {
	const res = await apiClient.post('/orders', data)
	return res.data
}

export const updateOrder = async (
	id: string,
	data: Partial<OrderPayload>
): Promise<Order> => {
	const res = await apiClient.put(`/orders/${id}`, data)
	return res.data
}

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
	const res = await apiClient.delete(`/orders/${id}`)
	return res.data
}
