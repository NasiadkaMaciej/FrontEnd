"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePokemon } from "../context/PokemonContext";
import { useFavorites } from "../context/FavoritesContext";
import Navigation from "../components/Navigation";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import "../styles/styles.css";

const Pokedex = () => {
    const { pokemonList, progress } = usePokemon();
    const { favorites } = useFavorites();
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const searchParams = useSearchParams();

    const typeFilter = searchParams.get("type");
    const searchFilter = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const filteredPokemons = pokemonList.filter(({ name, types }) => {
        const matchesType = !typeFilter || types.some(({ type }) => type.name === typeFilter);
        const matchesSearch = name.toLowerCase().includes(searchFilter.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <>
            <Navigation progress={progress} />
            <main>
                <section>
                    <h2>Pokémon List</h2>
                    <PokemonList
                        pokemons={filteredPokemons.slice(0, limit)}
                        onSelectPokemon={setSelectedPokemon}
                        favorites={favorites}
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
