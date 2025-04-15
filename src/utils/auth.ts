import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'elfy@rana'

export const signToken = (payload: object) =>
	jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET)
