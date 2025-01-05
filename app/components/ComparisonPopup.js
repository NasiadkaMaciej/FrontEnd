const ComparisonPopup = ({ selectedPokemons, onClose }) => {
	if (!selectedPokemons || selectedPokemons.length < 2) return null;

	return (
		<div className="comparison-popup">
			<button id="close-popup" className="closeBtn" onClick={onClose}>
				&times;
			</button>
			<h2>Compare Pokémon</h2>
			<div className="comparison-container">
				{selectedPokemons.map((pokemon) => (
					<div key={pokemon.id} className="pokemon-comparison">
						<img src={pokemon.gif} alt={pokemon.name} />
						<h3>{pokemon.name}</h3>
						<ul>
							<li><strong>Height:</strong> {pokemon.height * 10} cm</li>
							<li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
							<li><strong>Types:</strong> {pokemon.types.join(", ")}</li>
							<li><strong>Abilities:</strong> {pokemon.abilities.join(", ")}</li>
							<li>
								<strong>Stats:</strong>
								<ul>
									{pokemon.stats.map(({ name, base_stat }) => (
										<li key={name}>
											<strong>{name}:</strong> {base_stat}
										</li>
									))}
								</ul>
							</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default ComparisonPopup;
