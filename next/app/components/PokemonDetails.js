import { useState, useEffect } from 'react';


const PokemonDetails = ({ pokemon }) => {
    if (!pokemon) return <p>Select a Pokémon to see details.</p>;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(pokemon.id));
    }, [pokemon]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(pokemon.id)) {
            localStorage.setItem('favorites', JSON.stringify(favorites.filter((id) => id !== pokemon.id)));
            setIsFavorite(false);
        } else {
            localStorage.setItem('favorites', JSON.stringify([...favorites, pokemon.id]));
            setIsFavorite(true);
        }
    };

    return (
        <div id="details">
            <h2>{pokemon.name}</h2>
            <span onClick={toggleFavorite} className={`favoriteBtn ${isFavorite ? 'favorite' : 'not-favorite'}`}>
                {isFavorite ? '★' : '☆'}
            </span>
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