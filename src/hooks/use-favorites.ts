import { useTypedSelector } from './use-typed-selector'

export const useFavorites = (id: number) => {
	const favorites = useTypedSelector(({ favorites }) => favorites)

	const isExistingInFav = favorites.some(favorite => favorite.id === id)

	return { favorites, isExistingInFav }
}
