import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) =>
	await bcrypt.hash(password, 10)

export const comparePassword = async (plain: string, hash: string) =>
	await bcrypt.compare(plain, hash)
