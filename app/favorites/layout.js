import { PokemonProvider } from '../context/PokemonContext';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function FavoritesLayout({ children }) {
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
