import { NextResponse } from 'next/server'
import Category from '@/models/category.model'
import { connectDatabase } from '@/configs/database'

// Create a new category
export async function POST(req: Request) {
	try {
		await connectDatabase()
		const { name } = await req.json()

		if (!name) {
			return NextResponse.json(
				{ error: 'Category name is required' },
				{ status: 400 }
			)
		}

		// Check if category already exists
		const existingCategory = await Category.findOne({ name })
		if (existingCategory) {
			return NextResponse.json(
				{ error: 'Category already exists' },
				{ status: 400 }
			)
		}

		// Create the category (slug will be auto-generated)
		const newCategory = await Category.create({ name })

		return NextResponse.json(newCategory, { status: 201 })
	} catch (error) {
		console.error('Error creating category:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

// Get all categories
/**
 * This TypeScript function asynchronously fetches categories from a database and returns them as a
 * JSON response, handling errors with a 500 status code if necessary.
 * @returns The `GET` function is returning a JSON response containing the fetched categories from the
 * database. If the fetching is successful, it returns the categories as JSON. If there is an error
 * during the process, it returns a JSON object with an error message indicating "Internal server
 * error" along with a status code of 500.
 */
// export async function GET() {
// 	try {
// 		await connectDatabase()
// 		const categories = await Category.find()
// 		return NextResponse.json(categories)
// 	} catch (error) {
// 		console.error('Error fetching categories:', error)
// 		return NextResponse.json(
// 			{ error: 'Internal server error' },
// 			{ status: 500 }
// 		)
// 	}
// }

// Get all categories with blog count
export async function GET() {
	try {
		await connectDatabase()

		// Use aggregation to get categories with the number of blogs in each category
		const categories = await Category.aggregate([
			{
				$lookup: {
					from: 'blogs', // The name of the blog collection in MongoDB
					localField: '_id', // Field in Category collection
					foreignField: 'category', // Field in Blog collection
					as: 'blogs' // Alias for the matched blogs
				}
			},
			{
				$addFields: {
					blogCount: { $size: '$blogs' } // Add a blogCount field with the size of the blogs array
				}
			},
			{
				$project: {
					name: 1,
					slug: 1,
					blogCount: 1 // Include only the necessary fields
				}
			}
		])

		// Check if there are no categories, and add the default "All" category
		if (categories.length === 0) {
			categories.push({
				name: 'All',
				slug: 'all',
				blogCount: 0 // You can customize this as needed
			})
		}

		return NextResponse.json(categories)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
