export const validateEmail = (email: string) =>
	/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
export const validatePhone = (phone: string) => /^\+?[1-9]\d{1,14}$/.test(phone) // Basic phone number validation
export const validateUrl = (url: string) =>
	/^(https?:\/\/)?([\w\d\-]+\.)+[a-zA-Z]{2,7}(\/[\w\d\-]*)*\/?$/.test(url)
