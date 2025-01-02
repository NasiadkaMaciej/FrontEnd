"use client";

import { useState } from 'react';
import { usePokemon } from "./context/PokemonContext";
import { useFavorites } from './context/FavoritesContext';
import Navigation from './components/Navigation';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './styles/styles.css';

const Home = () => {
    const { pokemonList, progress } = usePokemon();
	const { favorites } = useFavorites();
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPokemons = pokemonList.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navigation progress={progress} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main>
                <section>
                    <h2>Pokémon List</h2>
                    <PokemonList pokemons={filteredPokemons.slice(0, 20)} onSelectPokemon={setSelectedPokemon} favorites={favorites}/>
                </section>
                <section>
                    <h2>Pokémon Details</h2>
                    <PokemonDetails pokemon={selectedPokemon} />
                </section>
            </main>
        </>
    );
};

export default Home;