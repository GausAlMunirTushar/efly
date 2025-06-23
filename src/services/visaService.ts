import apiClient from '@/configs/apiConfig'

export type EntryTypeOption = 'Single Entry' | 'Double Entry' | 'Multiple Entry'

export interface VisaEntryType {
	entryType: EntryTypeOption
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
	content?: string
}

export type Visa = {
	_id?: string
	country: string
	countryCode: string
	countryImage: string
	visaType: 'Tourist Visa'
	visaMode: 'E-Visa'
	processingTime: string
	visaValidity: string
	maxStay: string
	description?: string
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
