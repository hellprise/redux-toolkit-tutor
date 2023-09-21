export interface IRecipe {
	id: number
	name: string
	ingredients: IIngredient[]
}

export interface IIngredient {
	id: number
	name: string
}

export interface IRecipeData extends Omit<IRecipe, 'id'> {}
