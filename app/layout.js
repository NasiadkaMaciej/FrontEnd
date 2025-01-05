"use client";

import { PokemonProvider } from "./context/PokemonContext";
export default function HomeLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<PokemonProvider>
					{children}
				</PokemonProvider>
			</body>
		</html>
	);
}
