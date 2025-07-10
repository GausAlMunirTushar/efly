import apiClient from '@/configs/apiConfig'

export interface Country {
	_id: string
	name: string
	countryCode: string
	image: string
	createdAt?: string
	updatedAt?: string
}

// Get all countries
export const getCountries = async (): Promise<Country[]> => {
	const response = await apiClient.get('/countries')
	return response.data
}

// Get a single country by ID
export const getCountryById = async (id: string): Promise<Country> => {
	const response = await apiClient.get(`/countries/${id}`)
	return response.data
}

// Create a new country
export const createCountry = async (
	country: Partial<Country>
): Promise<Country> => {
	const response = await apiClient.post('/countries', country)
	return response.data
}

// Update existing country
export const updateCountry = async (
	id: string,
	country: Partial<Country>
): Promise<Country> => {
	const response = await apiClient.put(`/countries/${id}`, country)
	return response.data
}

// Delete a country
export const deleteCountry = async (id: string): Promise<void> => {
	await apiClient.delete(`/countries/${id}`)
}

// Upload image
export const uploadImage = async (file: File): Promise<string> => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await apiClient.post('/upload', formData, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})

	return response.data.url
}

// Get a country by name
export const getCountryByName = async (
	name: string
): Promise<Country | null> => {
	const response = await apiClient.get(
		`/countries?name=${encodeURIComponent(name)}`
	)
	return response.data.length ? response.data[0] : null
}
