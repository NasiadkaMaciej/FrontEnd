"use client";

import { PokemonProvider } from "../context/PokemonContext";

export default function FavoritesLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>Pokédex</title>
			</head>
			<body>
				<PokemonProvider>
					{children}
				</PokemonProvider>
			</body>
		</html>
	);
}
