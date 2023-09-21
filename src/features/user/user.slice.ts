import { createSlice } from '@reduxjs/toolkit'

import { getUserById } from './user.actions'

import { IInitialUserState } from '../../types/user.types'

const initialState: IInitialUserState = {
	user: null,
	isLoading: false,
	error: null,
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserById.pending, state => {
				state.isLoading = true
			})
			.addCase(getUserById.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(getUserById.rejected, state => {
				state.isLoading = false
				state.user = null
				state.error = 'Something went wrong'
			})
	},
})
