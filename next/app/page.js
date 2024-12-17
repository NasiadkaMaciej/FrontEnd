"use client";

import { useState, useEffect } from 'react';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './styles/styles.css';  // Import the CSS file

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const NUMBER_OF_POKEMONS = 1302;
const ITEMS_ON_LIST = 20;

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = async (offset = 0, limit = ITEMS_ON_LIST) => {
        if (offset >= NUMBER_OF_POKEMONS) return;

        try {
            const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
            const data = await response.json();

            const batchDetails = await Promise.all(
                data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
            );

            setPokemonList((prevList) => [...prevList, ...batchDetails]);
            setProgress(Math.min(offset + limit, NUMBER_OF_POKEMONS));

            if (offset + limit < NUMBER_OF_POKEMONS)
                loadPokemons(offset + limit, limit);

        } catch (error) {
            console.error('Error fetching Pokémons:', error);
        }
    };

    const filteredPokemons = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header progress={progress} total={NUMBER_OF_POKEMONS} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main>
                <section>
                    <h2>Pokémon List</h2>
                    <PokemonList pokemons={filteredPokemons.slice(0, 20)} onSelectPokemon={setSelectedPokemon} />
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