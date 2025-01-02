"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const addFavorite = useCallback((pokemon) => {
        const updatedFavorites = [...favorites, pokemon];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }, [favorites]);

    const removeFavorite = useCallback((id) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }, [favorites]);

    const isFavorite = (id) => favorites.some((fav) => fav.id === id);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
