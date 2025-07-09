import apiClient from '@/configs/apiConfig'

export const getAllLocations = async () => {
	const res = await apiClient.get('/locations')
	return res.data
}

export const createLocation = async (name: string) => {
	const res = await apiClient.post('/locations', { name })
	return res.data
}

export const getLocationById = async (id: string) => {
	const res = await apiClient.get(`/locations/${id}`)
	return res.data
}

export const updateLocation = async (id: string, name: string) => {
	const res = await apiClient.put(`/locations/${id}`, { name })
	return res.data
}

export const deleteLocation = async (id: string) => {
	const res = await apiClient.delete(`/locations/${id}`)
	return res.data
}

export const getLocationByName = async (name: string) => {
	const res = await apiClient.get('/locations', {
		params: { name } // axios automatically encodes the query
	})
	return res.data
}
