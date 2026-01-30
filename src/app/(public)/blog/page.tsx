import BlogList from '@/components/pages/front-pages/blog/BlogList'

export const metadata = {
	title: 'Blog - bijoyair Travel',
	description: 'Blog page'
}
export default function BlogPage() {
	return (
		<section className='max-w-7xl mx-auto'>
			<BlogList />
		</section>
	)
}
