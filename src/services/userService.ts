import apiClient from '@/configs/apiConfig'

export interface CreateUserPayload {
	name: string
	email: string
	phone: string
	password: string
	role?: 'admin' | 'editor' | 'user'
}

export interface UpdateUserPayload {
	name?: string
	email?: string
	phone?: string
	role?: 'admin' | 'editor' | 'user'
}

export const getUsers = async () => {
	const response = await apiClient.get('/users')
	return response.data
}

export const getUserById = async (id: string) => {
	const response = await apiClient.get(`/users/${id}`)
	return response.data
}

export const createUser = async (userData: CreateUserPayload) => {
	const response = await apiClient.post('/users', userData)
	return response.data
}

export const updateUser = async (id: string, userData: UpdateUserPayload) => {
	const response = await apiClient.put(`/users/${id}`, userData)
	return response.data
}

export const deleteUser = async (id: string) => {
	const response = await apiClient.delete(`/users/${id}`)
	return response.data
}
