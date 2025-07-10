import apiClient from '@/configs/apiConfig'

// Define the structure of country object
export interface Country {
	_id: string
	name: string
	countryCode: string
	image: string
}

// Visa interface based on updated response
export interface Visa {
	_id: string
	country: Country
	visaType: string
	visaMode?: string
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	visaFee?: string
	serviceCharge?: string
}

// Get all visas
export const getVisas = async (): Promise<Visa[]> => {
	const response = await apiClient.get('/visas')
	return response.data
}

// Get a single visa by ID
export const getVisaById = async (id: string): Promise<Visa> => {
	const response = await apiClient.get(`/visas/${id}`)
	return response.data
}

// Create a new visa
export const createVisa = async (visa: Partial<Visa>): Promise<Visa> => {
	const response = await apiClient.post('/visas', visa)
	return response.data
}

// Update existing visa
export const updateVisa = async (
	id: string,
	visa: Partial<Visa>
): Promise<Visa> => {
	const response = await apiClient.put(`/visas/${id}`, visa)
	return response.data
}

// Delete a visa
export const deleteVisa = async (id: string): Promise<void> => {
	await apiClient.delete(`/visas/${id}`)
}

export const getVisasByCountryName = async (name: string): Promise<Visa[]> => {
	const response = await apiClient.get(
		`/visas?name=${encodeURIComponent(name)}`
	)
	return response.data
}
