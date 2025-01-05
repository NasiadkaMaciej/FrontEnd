"use client";

import { PokemonProvider } from "../context/PokemonContext";

export default function PokedexLayout({ children }) {
	return (
		<PokemonProvider>
			{children}
		</PokemonProvider>
	);
}
