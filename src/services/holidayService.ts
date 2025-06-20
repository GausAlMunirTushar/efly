import apiClient from '@/configs/apiConfig'
import { IHoliday } from '@/types/IHoliday'

export const getAllHolidays = async () => {
	const res = await apiClient.get('/holiday')
	return res.data as IHoliday[]
}

export const getHolidayById = async (id: string) => {
	const res = await apiClient.get(`/holiday/${id}`)
	return res.data
}

export const createHoliday = async (payload: any) => {
	const res = await apiClient.post('/holiday', payload)
	return res.data
}

export const updateHoliday = async (id: string, payload: any) => {
	const res = await apiClient.put(`/holiday/${id}`, payload)
	return res.data
}

export const deleteHoliday = async (id: string) => {
	const res = await apiClient.delete(`/holiday/${id}`)
	return res.data
}
