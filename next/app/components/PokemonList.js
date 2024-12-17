const PokemonList = ({ pokemons, onSelectPokemon }) => {
    return (
        <div id="pokemon-list">
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.id} onClick={() => onSelectPokemon(pokemon)}>
                        <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
                        <span>{pokemon.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;