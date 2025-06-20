import apiClient from '@/configs/apiConfig'

export const getAllLocations = async () => {
	const res = await apiClient.get('/location')
	return res.data
}

export const createLocation = async (name: string) => {
	const res = await apiClient.post('/location', { name })
	return res.data
}

export const getLocationById = async (id: string) => {
	const res = await apiClient.get(`/location/${id}`)
	return res.data
}

export const updateLocation = async (id: string, name: string) => {
	const res = await apiClient.put(`/location/${id}`, { name })
	return res.data
}

export const deleteLocation = async (id: string) => {
	const res = await apiClient.delete(`/location/${id}`)
	return res.data
}
