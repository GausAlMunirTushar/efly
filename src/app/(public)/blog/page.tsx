import BlogList from '@/components/pages/front-pages/blog/BlogList'

export const metadata = {
	title: 'Blog - efly Travel',
	description: 'Blog page'
}
export default function BlogPage() {
	return (
		<section>
			<BlogList />
		</section>
	)
}
