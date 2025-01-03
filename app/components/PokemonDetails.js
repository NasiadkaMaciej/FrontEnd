import { useFavorites } from "../context/FavoritesContext";

const PokemonDetails = ({ pokemon }) => {
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	if (!pokemon) return <p>Select a Pokémon to see details.</p>;

	const toggleFavorite = () => {
		if (isFavorite(pokemon.id)) removeFavorite(pokemon.id);
		else addFavorite(pokemon);
	};

	return (
		<div id="details">
			<h2>{pokemon.name}</h2>
			<img src={pokemon.gif} alt={name} />
			<ul>
				<li><strong>Height:</strong> {pokemon.height * 10} cm</li>
				<li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
				<li><strong>Types:</strong> {pokemon.types.map(({ type }) => type.name).join(", ")}</li>
				<li><strong>Abilities:</strong>{pokemon.abilities.map(({ ability }) => ability.name).join(", ")}</li>
				<li>
					<strong>Stats:</strong>
					<ul>
						{pokemon.stats.map(({ stat, base_stat }) => (
							<li key={stat.name}>
								<strong>{stat.name}:</strong> {base_stat}
							</li>
						))}
					</ul>
				</li>
				<li>
					<span
						onClick={toggleFavorite}
						className={`${isFavorite(pokemon.id) ? "favorite" : ""} favoriteBtn`}
					>
						{isFavorite(pokemon.id) ? "★" : "☆"}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default PokemonDetails;