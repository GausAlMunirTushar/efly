import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://efly.gausalmunir.site',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://efly.gausalmunir.site/about',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},
		{
			url: 'https://efly.gausalmunir.site/blog',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		}
	]
}
