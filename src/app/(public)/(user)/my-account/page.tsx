import MyAccountForm from '@/components/pages/user/my-account/MyAccountForm'

export const metadata = {
	title: 'My Account'
}

const UserMyAccount = () => {
	return (
		<section className='overflow-y-auto '>
			<MyAccountForm />
		</section>
	)
}

export default UserMyAccount
