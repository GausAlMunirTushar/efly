import apiClient from '@/configs/apiConfig'

export interface UmrahPackage {
	_id?: string
	title: string
	description: string
	price: number
	duration: string
	hotelDetails: string
	transportDetails: string
	image?: string
	[key: string]: any
}

// Create a new Umrah package
export const createUmrah = async (data: UmrahPackage) => {
	const response = await apiClient.post('/umrah', data)
	return response.data
}

// Get all Umrah packages
export const getAllUmrah = async () => {
	const response = await apiClient.get('/umrah')
	return response.data
}

// Get a single Umrah package by ID
export const getUmrahById = async (id: string) => {
	const response = await apiClient.get(`/umrah/${id}`)
	return response.data
}

// Update an existing Umrah package by ID
export const updateUmrah = async (id: string, data: Partial<UmrahPackage>) => {
	const response = await apiClient.put(`/umrah/${id}`, data)
	return response.data
}

// Delete an Umrah package by ID
export const deleteUmrah = async (id: string) => {
	const response = await apiClient.delete(`/umrah/${id}`)
	return response.data
}
