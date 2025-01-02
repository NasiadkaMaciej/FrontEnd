"use client";

import { useState } from 'react';
import { useFavorites } from "../context/FavoritesContext";
import { usePokemon } from "../context/PokemonContext";
import Navigation from '../components/Navigation';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';
import '../styles/styles.css';

const Favorites = () => {
    const { pokemonList, progress } = usePokemon();
    const { favorites } = useFavorites();
    const [selectedPokemon, setSelectedPokemon] = useState(null);


	const favoritePokemons = pokemonList.filter((pokemon) =>
        favorites.some((fav) => fav.id === pokemon.id)
    );

    return (
        <>
            <Navigation progress={progress} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main>
                <section>
                    <h2>Favorite Pokémon</h2>
                    {favorites.length > 0 ? (
                        <PokemonList pokemons={favoritePokemons} onSelectPokemon={setSelectedPokemon} favorites={favorites} />
                    ) : (
                        <p>No favorite Pokémon found!</p>
                    )}
                </section>
                <section>
                    <h2>Pokémon Details</h2>
                    <PokemonDetails pokemon={selectedPokemon} />
                </section>
            </main>
        </>
    );
};

export default Favorites;