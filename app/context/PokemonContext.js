"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
	const NUMBER_OF_POKEMONS = 1302;
	const BATCH = 20;

	const [pokemonList, setPokemonList] = useState([]);
	const [progress, setProgress] = useState(0);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		// If available, load from localstorage
		const storedPokemons = JSON.parse(localStorage.getItem("pokemonList"));
		if (storedPokemons && storedPokemons.length == NUMBER_OF_POKEMONS) {
			setPokemonList(storedPokemons);
			setProgress(storedPokemons.length);
		} else {
			loadPokemons();
		}
	}, []);

	const loadPokemons = async (offset = 0, limit = BATCH) => {
		if (offset >= NUMBER_OF_POKEMONS || isFetching) return;

		setIsFetching(true);
		try {
			const response = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
			const data = await response.json();

			const batchDetails = await Promise.all(
				data.results.map(async (pokemon) => {
					const response = await fetch(pokemon.url);
					const pokemonData = await response.json();

					// Correctly access and store the sprite URL from the Pokémon data
					const sprite = pokemonData.sprites?.other?.showdown?.front_default;

					return {
						id: pokemonData.id,
						name: pokemonData.name,
						weight: pokemonData.weight,
						height: pokemonData.height,
						types: pokemonData.types,
						abilities: pokemonData.abilities,
						stats: pokemonData.stats,
						gif: sprite // Ensure sprite is correctly saved
					};
				})
			);

			setPokemonList((prevList) => {
				const updatedList = [...prevList, ...batchDetails];
				// Save only necessary Pokémon data to localStorage
				localStorage.setItem("pokemonList", JSON.stringify(updatedList));
				return updatedList;
			});
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
