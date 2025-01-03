"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFavorites } from "../context/FavoritesContext";
import { usePokemon } from "../context/PokemonContext";
import Navigation from "../components/Navigation";
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import "../styles/styles.css";

const Favorites = () => {
    const { pokemonList, progress } = usePokemon();
    const { favorites } = useFavorites();
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const searchParams = useSearchParams();

    const typeFilter = searchParams.get("type");
    const searchFilter = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "20");

    const favoritePokemons = pokemonList.filter((pokemon) => {
        const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
        const matchesType = !typeFilter || pokemon.types.some(({ type }) => type.name === typeFilter);
        const matchesSearch = pokemon.name.toLowerCase().includes(searchFilter.toLowerCase());
        return isFavorite && matchesType && matchesSearch;
    });

    return (
        <>
            <Navigation progress={progress} />
            <main>
                <section>
                    <h2>Favorite Pokémon</h2>
                    {favorites.length > 0 ? (
                        <PokemonList
                            pokemons={favoritePokemons.slice(0, limit)}
                            onSelectPokemon={setSelectedPokemon}
                            favorites={favorites}
                        />
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
