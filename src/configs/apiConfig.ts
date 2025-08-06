import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'https://efly.com.bd/backend/api/v1'

const apiClient: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
	withCredentials: true
})

import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

apiClient.interceptors.request.use(
	(config: any) => {
		const token = Cookies.get('token')
		const role = Cookies.get('role')

		if (token) {
			if (!config.headers) config.headers = {}
			config.headers.Authorization = `Bearer ${token}`
		}
		if (role) {
			if (!config.headers) config.headers = {}
			config.headers['X-User-Role'] = role
		}

		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			Cookies.remove('token')
			Cookies.remove('role')
			Cookies.remove('userId')
		}
		return Promise.reject(error)
	}
)

export default apiClient
