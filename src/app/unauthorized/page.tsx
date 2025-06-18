import Button from '@/components/form/Button'

export default function UnauthorizedPage() {
	return (
		<div className='text-center mt-10 text-red-600 text-xl'>
			You are not authorized to access this page.
			<Button>Back to Home</Button>
		</div>
	)
}
