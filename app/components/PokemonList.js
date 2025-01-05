import { usePokemonContext } from "../context/PokemonContext";

const PokemonList = ({ pokemonsToShow, onSelectPokemon, onComparePokemon }) => {
    const { favorites, toggleFavorite } = usePokemonContext();
	if (!pokemonsToShow || pokemonsToShow.length === 0) return <p>No Pokémon to display.</p>;
	// Maybe handle favorites/non-favorites logic here to simplify code below?
	return (
		<div id="pokemon-list">
			<ul>
				{pokemonsToShow.map((pokemon) => (
					<li
						key={pokemon.id}
						onClick={() => onSelectPokemon(pokemon)}
						className={favorites.some((fav) => fav.id === pokemon.id) ? "favorite" : ""}
					>
						<img src={pokemon.gif} alt={pokemon.name} />
						<span>{pokemon.name}</span>
						<button className='compareBtn'
							onClick={(e) => {
								e.stopPropagation();
								onComparePokemon(pokemon)
							}}>Compare</button>
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
