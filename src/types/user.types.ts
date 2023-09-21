export interface IUser {
	id: number
	name: string
}

export interface IInitialUserState {
	user: null | IUser
	isLoading: boolean
	error: null | string
}
