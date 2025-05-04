import UserProfile from '@/components/pages/user/my-booking/UserProfile'

export const metadata = {
	title: 'My Account'
}

const UserMyAccount = () => {
	return (
		<section className='overflow-y-auto '>
			<UserProfile />
		</section>
	)
}

export default UserMyAccount
