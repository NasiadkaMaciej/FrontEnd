"use client";

import { useState, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import Navigation from "../components/Navigation";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import ComparisonPopup from "../components/ComparisonPopup";
import { filterPokemons } from "../utils/filterPokemons";

import "../styles/styles.scss";

const PokemonPage = ({ pageType }) => {
	const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
	const NUMBER_OF_POKEMONS = 1302;
	const BATCH = 20;

	const {
		pokemonList,
		setPokemonList,
		favorites,
		setFavorites,
		search,
		setSearch,
		type,
		setType,
		limit,
		setLimit,
		progress,
		setProgress,
	} = usePokemonContext();

	const [isFetching, setIsFetching] = useState(false);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [comparisonList, setComparisonList] = useState([]);
	const [isComparisonOpen, setIsComparisonOpen] = useState(false);

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

					return {
						id: pokemonData.id,
						name: pokemonData.name,
						weight: pokemonData.weight,
						height: pokemonData.height,
						types: pokemonData.types.map(type => type.type.name),
						abilities: pokemonData.abilities.map(ability => ability.ability.name),
						stats: pokemonData.stats.map(stat => ({
							base_stat: stat.base_stat,
							name: stat.stat.name
						})),
						gif: pokemonData.sprites?.other?.showdown?.front_default
					};
				})
			);

			setPokemonList((prevList) => {
				const updatedList = [...prevList, ...batchDetails];
				localStorage.setItem("pokemonList", JSON.stringify(updatedList));
				return updatedList;
			});

			const totalLoadedPokemons = offset + batchDetails.length;
			setProgress(Math.min(totalLoadedPokemons, NUMBER_OF_POKEMONS)); // Ensure progress doesn't exceed total number of Pokémon

		} catch (error) {
			console.error("Error fetching Pokémon:", error);
		} finally {
			setIsFetching(false);
		}

		if (offset + limit < NUMBER_OF_POKEMONS)
			loadPokemons(offset + limit, limit);
	};

	useEffect(() => {
		// Load pokemon list and favorite list
		const storedPokemons = JSON.parse(localStorage.getItem("pokemonList")) || [];
		const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
		// If available, load from localstorage
		if (storedPokemons.length == NUMBER_OF_POKEMONS) {
			setPokemonList(storedPokemons);
			setProgress(storedPokemons.length);
		} else loadPokemons();
		setFavorites(storedFavorites);

		// Load comparison
		const storedComparison = JSON.parse(localStorage.getItem("lastComparison")) || [];
		setComparisonList(storedComparison);
		if (storedComparison.length > 0) setIsComparisonOpen(true);
	}, []);

	useEffect(() => {
		localStorage.setItem("lastComparison", JSON.stringify(comparisonList));
	}, [comparisonList]);

	const addPokemonToCompare = (pokemon) => {
		if (comparisonList.some((comp) => comp.id === pokemon.id)) return;
		setComparisonList([...comparisonList, pokemon]);
		if (comparisonList.length >= 1) setIsComparisonOpen(true);
	};

	const clearComparison = () => {
		setComparisonList([]);
		setIsComparisonOpen(false);
	};

	const pokelist = pageType === "favorite" ? favorites : pokemonList;
	const filteredPokemons = filterPokemons(pokelist, { type, search, limit });

	return (
		<>
			<Navigation
				setSearch={setSearch}
				setType={setType}
				setLimit={setLimit}
				progress={progress}
				search={search}
				type={type}
				limit={limit}
			/>
			<main>
				<section>
					<h2>{pageType === "favorite" ? "Favorite Pokémon List" : "Pokémon List"}</h2>
					<PokemonList
						pokemonsToShow={filteredPokemons}
						onSelectPokemon={setSelectedPokemon}
						onComparePokemon={addPokemonToCompare}
					/>
				</section>
				<section>
					<h2>Pokémon Details</h2>
					<PokemonDetails pokemon={selectedPokemon} />
				</section>
				{isComparisonOpen && (
					<div id="comparison-popup">
						<ComparisonPopup
							selectedPokemons={comparisonList}
							onClose={clearComparison}
						/>
					</div>
				)}
			</main>
		</>
	);
};

export default PokemonPage;
