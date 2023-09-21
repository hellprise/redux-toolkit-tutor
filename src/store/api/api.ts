import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IRecipe } from '../../types/recipe.types'
import { RTK_TAGS } from '../../utils/constants'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: [RTK_TAGS.RECIPE],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
	}),
	endpoints: builder => ({
		// if we want to add ts in endpoint, we can use two types. the first type describes what we receive from the server. and the second type describes query arguments that we pass to the endpoint (userId, etc.). if we don't pass any arguments, we can use null or any
		getRecipes: builder.query<IRecipe[], string>({
			query: searchTerm =>
				`/?_sort=id&_order=desc${searchTerm ? `&q=${searchTerm}` : ''}`,
			providesTags: (result, error, searchTerm) => [
				{ type: RTK_TAGS.RECIPE, id: searchTerm },
			],
		}),
	}),
})

export const { useGetRecipesQuery } = api
