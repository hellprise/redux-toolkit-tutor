import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import { reducer as favoriteReducer } from '../features/favorites/favorites.slice'
import { userSlice } from '../features/user/user.slice'

import { api } from './api/api'

const logger = createLogger({
	collapsed: true,
	colors: {
		title: () => '#139BFE',
		prevState: () => '#1c5faf',
		action: () => '#149945',
		error: () => '#ff0005',
		nextState: () => '#a47104',
	},
})

const reducers = combineReducers({
	favorites: favoriteReducer,
	user: userSlice.reducer,
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware).concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
