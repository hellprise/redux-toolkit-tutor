import { useActions } from '../hooks/use-actions'
import { useFavorites } from '../hooks/use-favorites'
import { IIngredient, IRecipe } from '../types/recipe.types'

export const RecipeItem = ({ recipe }: { recipe: IRecipe }) => {
	const { isExistingInFav } = useFavorites(recipe.id)

	const { toggleFavorites } = useActions()

	const addToFavorites = () => {
		toggleFavorites(recipe)
	}

	const ingredientsToStr = (ingredients: IIngredient[]) => {
		return ingredients.map(ingredient => ingredient.name).join(', ')
	}

	return (
		<div className='bg-stone-500 text-white p-3 rounded-lg'>
			<h1>{recipe.name}</h1>

			<p className='text-sm mt-1 mb-3'>
				{ingredientsToStr(recipe.ingredients)}
			</p>

			<button
				onClick={addToFavorites}
				className='text-sm bg-black text-white rounded-lg px-4 py-2'
			>
				{isExistingInFav ? 'Remove from favorites' : 'Add to favorites'}
			</button>
		</div>
	)
}
