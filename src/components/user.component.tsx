import { useActions } from '../hooks/use-actions'

import { useSelector } from 'react-redux'

export const User = () => {
	const { user, isLoading, error } = useSelector(({ user }) => user)

	const { getUserById } = useActions()

	const getUser = () => {
		getUserById(1)
	}

	return (
		<section className='flex items-center gap-5'>
			<button
				onClick={getUser}
				className='bg-blue-500 text-white px-3 py-1 rounded-lg'
			>
				<span>Get User</span>
			</button>

			{isLoading ? (
				<p>Loading user...</p>
			) : error ? (
				<p>{error}</p>
			) : user?.name ? (
				<div>
					<h1>{user.name}</h1>
				</div>
			) : (
				<div>
					<h1>Not logged in</h1>
				</div>
			)}
		</section>
	)
}
