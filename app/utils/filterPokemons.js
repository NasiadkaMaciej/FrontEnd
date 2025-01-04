export const filterPokemons = (pokemonList, type, search, limit ) => {
    return pokemonList.filter((pokemon) => {
        const matchesType = !type || pokemon.types.some(({ type }) => type.name === type);
        const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());

        return matchesType && matchesSearch;

    }).slice(0, limit);
};