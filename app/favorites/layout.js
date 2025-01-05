"use client";

import { PokemonProvider } from "../context/PokemonContext";

export default function FavoritesLayout({ children }) {
	return (
		<PokemonProvider>
			{children}
		</PokemonProvider>
	);
}
