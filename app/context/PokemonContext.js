"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
	const NUMBER_OF_POKEMONS = 1302;
	const BATCH = 20;

	const [pokemonList, setPokemonList] = useState([]);
	const [progress, setProgress] = useState(0);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		if (pokemonList.length === 0 && !isFetching) {
			loadPokemons();
		}
	}, [pokemonList, isFetching]);

	const loadPokemons = async (offset = 0, limit = BATCH) => {
		if (offset >= NUMBER_OF_POKEMONS || isFetching) return;

		setIsFetching(true);
		try {
			const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
			const data = await response.json();

			const batchDetails = await Promise.all(
				data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
			);

			setPokemonList((prevList) => [...prevList, ...batchDetails]);
			setProgress(Math.min(offset + limit, NUMBER_OF_POKEMONS));
		} catch (error) {
			console.error("Error fetching Pokémon:", error);
		} finally {
			setIsFetching(false);
		}

		if (offset + limit < NUMBER_OF_POKEMONS) {
			loadPokemons(offset + limit, limit);
		}
	};

	return (
		<PokemonContext.Provider value={{ pokemonList, progress }}>
			{children}
		</PokemonContext.Provider>
	);
};

export const usePokemon = () => useContext(PokemonContext);