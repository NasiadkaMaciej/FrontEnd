"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
    const NUMBER_OF_POKEMONS = 1302;
    const ITEMS_ON_LIST = 20;
	
    const [pokemonList, setPokemonList] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (pokemonList.length === 0) {
            loadPokemons();
        }
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

            if (offset + limit < NUMBER_OF_POKEMONS) {
                loadPokemons(offset + limit, limit);
            }
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemonList, progress }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => useContext(PokemonContext);
