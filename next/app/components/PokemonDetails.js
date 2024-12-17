const PokemonDetails = ({ pokemon }) => {
    if (!pokemon) return <p>Select a Pokémon to see details.</p>;

    return (
        <div id="details">
            <h3>{pokemon.name}</h3>
            <img
                src={pokemon.sprites.other.showdown.front_default}
                alt={pokemon.name}
            />
            <ul>
                <li>
                    <strong>Height:</strong> {pokemon.height * 10} cm
                </li>
                <li>
                    <strong>Weight:</strong> {pokemon.weight / 10} kg
                </li>
                <li>
                    <strong>Type:</strong> {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
                </li>
                <li>
                    <strong>Abilities:</strong> {pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ')}
                </li>
                <li>
                    <strong>Stats:</strong>
                    <ul>
                        {pokemon.stats.map((statInfo) => (
                            <li key={statInfo.stat.name}>
                                <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default PokemonDetails;