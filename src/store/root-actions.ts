import { actions as favoriteActions } from '../features/favorites/favorites.slice'
import * as userActions from '../features/user/user.actions'

export const rootActions = {
	...favoriteActions,
	...userActions,
}
