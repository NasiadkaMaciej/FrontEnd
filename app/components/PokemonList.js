const PokemonList = ({ pokemons, onSelectPokemon, favorites, toggleFavorite }) => {
	if (!pokemons || pokemons.length === 0) return <p>No Pokémon to display.</p>;

	return (
		<div id="pokemon-list">
			<ul>
				{pokemons.map((pokemon) => (
					<li
						key={pokemon.id}
						onClick={() => onSelectPokemon(pokemon)}
						className={favorites.some((fav) => fav.id === pokemon.id) ? "favorite" : ""}
					>
						<img src={pokemon.gif} alt={pokemon.name} />
						<span>{pokemon.name}</span>
						<span
							onClick={(e) => {
								e.stopPropagation();
								toggleFavorite(pokemon);
							}}
							className={`${favorites.some((fav) => fav.id === pokemon.id) ? "favorite" : ""} favoriteBtn`}
						>
							{favorites.some((fav) => fav.id === pokemon.id) ? "★" : "☆"}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonList;
