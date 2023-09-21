import { ChangeEvent, FormEvent, useState } from 'react'
import { BsHeart } from 'react-icons/bs'

import { useGetRecipesQuery } from './store/api/api'
import { useCreateRecipeMutation } from './store/api/recipe/api'

import { useTypedSelector } from './hooks/use-typed-selector'

import { RecipeItem } from './components/recipe-item.component'
import { User } from './components/user.component'
import { IRecipeData } from './types/recipe.types'

// const userId = 1

const DEFAULT_RECIPE: IRecipeData = {
	name: '',
	ingredients: [],
}

function App() {
	const [recipe, setValue] = useState(DEFAULT_RECIPE)
	const [searchTerm, setSearchTerm] = useState('')
	const [queryTerm, setQueryTerm] = useState('')

	// const { data, isLoading, error } = useGetRecipesQuery(undefined, {
	// 	// skip: !userId, // skip the query if userId is undefined and data will be undefined
	// })

	// const { data, isLoading, error } = useGetRecipesQuery(null) //if we don't set an argument - will be error, it's ts rtk query's trouble, so we should use null or add undefined and object with any options

	const { data, isLoading, error } = useGetRecipesQuery(queryTerm)

	const [createRecipe] = useCreateRecipeMutation()

	const favorites = useTypedSelector(({ favorites }) => favorites)

	// const addIngredient = () => {
	// 	setValue(prevState => ({
	// 		...prevState,
	// 		ingredients: [...prevState.ingredients, recipe.ingredients],
	// 	}))
	// }

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setValue(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		createRecipe(recipe).then(() => {
			setValue(DEFAULT_RECIPE)
		})
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const toggleSearch = () => {
		setQueryTerm(searchTerm)
		// setSearchTerm('')
	}

	return (
		<>
			<header className='flex items-center justify-end container py-5 px-3'>
				<section className='flex items-center gap-3 mr-5'>
					<input
						className='border border-gray-400 rounded-lg px-3 py-1 outline-none'
						type='search'
						name='search'
						placeholder='enter a value'
						value={searchTerm}
						onChange={handleSearch}
					/>

					<button
						onClick={toggleSearch}
						type='button'
						className='bg-slate-900 text-white px-5 py-1 rounded-lg'
					>
						Search
					</button>
				</section>

				<section className='mr-10'>
					<User />
				</section>

				<section className='relative'>
					<BsHeart className='text-3xl text-red-500 relative z-[0]' />

					<div className='bg-black h-5 w-5 rounded-xl absolute -top-1 -right-1 z-[1] flex items-center justify-center'>
						<span className='text-white text-sm font-bold'>
							{favorites.length}
						</span>
					</div>
				</section>
			</header>

			<form
				className='bg-slate-50 p-10 rounded-lg mb-10 container max-w-md'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					name='name'
					placeholder='Name'
					onChange={handleChange}
					value={recipe.name}
				/>

				{/* <section>
					<input
						type='text'
						name='ingredients'
						placeholder='Ingredients'
						onChange={handleChange}
						value={recipe.ingredients}
					/>

					<button
						onClick={addIngredient}
						type='button'
						className='bg-slate-900 text-white px-5 py-2 rounded-lg mt-5'
					>
						Add
					</button>
				</section> */}

				<button
					type='submit'
					className='bg-slate-900 text-white px-5 py-2 rounded-lg mt-5'
				>
					Create
				</button>
			</form>

			{!isLoading ? (
				<div className='bg-slate-100 p-10 rounded-lg container grid grid-cols-3 gap-5'>
					{data ? (
						data.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />)
					) : (
						<p className='text-2xl col-start-2'>No recipes yet!</p>
					)}
				</div>
			) : (
				<p className='text-center text-2xl'>Loading...</p>
			)}
			{error && <p className='text-center text-2xl'>{(error as any).error}</p>}

			<h1 className='text-3xl font-bold text-center'>Favorites</h1>

			{favorites.length >= 1 ? (
				<div className='bg-slate-100 p-10 rounded-lg container grid grid-cols-3 gap-5'>
					{favorites.map(recipe => (
						<RecipeItem key={recipe.id} recipe={recipe} />
					))}
				</div>
			) : (
				<p className='text-center text-2xl'>No favorites yet!</p>
			)}
		</>
	)
}

export default App
