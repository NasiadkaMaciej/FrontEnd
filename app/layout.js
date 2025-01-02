// app/layout.js
import { PokemonProvider } from './context/PokemonContext';
import { FavoritesProvider } from './context/FavoritesContext';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>Pokédex</title>
			</head>
			<body>
				<PokemonProvider>
					<FavoritesProvider>
						{children}
					</FavoritesProvider>
				</PokemonProvider>
			</body>
		</html>
	);
}
