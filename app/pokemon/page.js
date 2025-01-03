"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePokemon } from "../context/PokemonContext";
import { useFavorites } from "../context/FavoritesContext";
import Navigation from "../components/Navigation";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import { filterPokemons } from "../utils/filterPokemons";
import "../styles/styles.css";

const Pokedex = () => {
	const { pokemonList, progress } = usePokemon();
	const { favorites, toggleFavorite } = useFavorites();
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const searchParams = useSearchParams();

	const typeFilter = searchParams.get("type");
	const searchFilter = searchParams.get("search") || "";
	const limit = parseInt(searchParams.get("limit") || "20");

	const filteredPokemons = filterPokemons(pokemonList, typeFilter, searchFilter, limit);

	return (
		<>
			<Navigation progress={progress} />
			<main>
				<section>
					<h2>Pokémon List</h2>
					<PokemonList
						pokemons={filteredPokemons}
						onSelectPokemon={setSelectedPokemon}
						favorites={favorites}
						toggleFavorite={toggleFavorite}
					/>
				</section>
				<section>
					<h2>Pokémon Details</h2>
					<PokemonDetails pokemon={selectedPokemon} />
				</section>
			</main>
		</>
	);
};

export default Pokedex;
