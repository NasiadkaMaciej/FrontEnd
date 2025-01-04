"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePokemon } from "../context/PokemonContext";
import { useFavorites } from "../context/FavoritesContext";
import Navigation from "../components/Navigation";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import { filterPokemons } from "../utils/filterPokemons";
import ComparisonPopup from "../components/ComparisonPopup";
import "../styles/styles.scss";

const PokemonPage = ({ pageType }) => {
	const { pokemonList, progress } = usePokemon();
	const { favorites, toggleFavorite } = useFavorites();
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [comparisonList, setComparisonList] = useState([]);
	const [isComparisonOpen, setIsComparisonOpen] = useState(false);

	const searchParams = useSearchParams();
	const typeFilter = searchParams.get("type");
	const searchFilter = searchParams.get("search") || "";
	const limit = parseInt(searchParams.get("limit") || "20");

	const pokemons = pageType === "favorite" ? favorites : pokemonList;
	const filteredPokemons = filterPokemons(pokemons, typeFilter, searchFilter, limit);

	const addPokemonToCompare = (pokemon) => {
		if (comparisonList.some((comp) => comp.id === pokemon.id)) return;
		setComparisonList([...comparisonList, pokemon]);
		if (comparisonList.length >= 1) setIsComparisonOpen(true);
	};

	const clearComparison = () => {
		setComparisonList([]);
		setIsComparisonOpen(false);
	};

	return (
		<>
			<Navigation progress={progress} />
			<main>
				<section>
					<h2>{pageType === "favorite" ? "Favorite Pokémon List" : "Pokémon List"}</h2>
					<PokemonList
						pokemons={filteredPokemons}
						onSelectPokemon={setSelectedPokemon}
						onComparePokemon={addPokemonToCompare}
						favorites={favorites}
						toggleFavorite={toggleFavorite}
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
