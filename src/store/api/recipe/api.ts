import { IRecipeData } from '../../../types/recipe.types'
import { RTK_TAGS } from '../../../utils/constants'
import { api } from '../api'

export const recipeApi = api.injectEndpoints({
	endpoints: builder => ({
		createRecipe: builder.mutation<null, IRecipeData>({
			query: recipe => ({ url: '/', body: recipe, method: 'POST' }),
			invalidatesTags: [
				{
					type: RTK_TAGS.RECIPE,
					// id: '1' if we need to update the one of the recipes
				},
			],
		}),

		getRecipe: builder.query({
			query: id => `/${id}`,
			providesTags: [RTK_TAGS.RECIPE],
		}),
	}),
})

export const { useGetRecipeQuery, useCreateRecipeMutation } = recipeApi
