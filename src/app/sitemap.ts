import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://efly.com.bd',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://efly.com.bd/about',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},
		{
			url: 'https://efly.com.bd/blog',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		}
	]
}
