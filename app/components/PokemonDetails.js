import { useFavorites } from "../context/FavoritesContext";

const PokemonDetails = ({ pokemon }) => {
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	if (!pokemon) return <p>Select a Pokémon to see details.</p>;
	const { name, sprites, height, weight, types, abilities, stats } = pokemon;

	const toggleFavorite = () => {
		if (isFavorite(pokemon.id)) removeFavorite(pokemon.id);
		else addFavorite(pokemon);
	};

	return (
		<div id="details">
			<h2>{name}</h2>
			<img src={sprites.other.showdown.front_default} alt={name} />
			<ul>
				<li><strong>Height:</strong> {height * 10} cm</li>
				<li><strong>Weight:</strong> {weight / 10} kg</li>
				<li><strong>Type:</strong> {types.map(({ type }) => type.name).join(", ")}</li>
				<li><strong>Abilities:</strong> {abilities.map(({ ability }) => ability.name).join(", ")}</li>
				<li>
					<strong>Stats:</strong>
					<ul>
						{stats.map(({ stat, base_stat }) => (
							<li key={stat.name}>
								<strong>{stat.name}:</strong> {base_stat}
							</li>
						))}
					</ul>
				</li>
				<li>
					<span
						onClick={toggleFavorite}
						className={`${isFavorite(pokemon.id) ? "favorite" : "" } favoriteBtn`}
					>
						{isFavorite(pokemon.id) ? "★" : "☆"}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default PokemonDetails;