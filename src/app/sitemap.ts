import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://bijoyair.com.bd',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://bijoyair.com.bd/about',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},
		{
			url: 'https://bijoyair.com.bd/blog',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		}
	]
}
