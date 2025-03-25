import BlogList from '@/components/pages/front-pages/blog/BlogList'
import BlogSlider from '@/components/pages/front-pages/blog/BlogSlider'

export default function BlogPage() {
	return (
		<section>
			<div className='mb-4'>
				<BlogSlider />
			</div>
			<BlogList />
		</section>
	)
}
