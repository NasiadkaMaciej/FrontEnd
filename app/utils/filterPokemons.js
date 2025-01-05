export const filterPokemons = (pokemonList, { type, search, limit }) => {
	return pokemonList
		.filter((pokemon) => {
			const matchesType = !type || pokemon.types.includes(type);
			const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
			return matchesType && matchesSearch;
		})
		.slice(0, limit);
};
