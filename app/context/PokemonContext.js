import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const [pokemonList, setPokemonList] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [search, setSearch] = useState("");
	const [type, setType] = useState("");
	const [limit, setLimit] = useState("20");
	const [progress, setProgress] = useState(0);

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const querySearch = searchParams.get('search') || search;
		const queryType = searchParams.get('type') || type;
		const queryLimit = searchParams.get('limit') || limit;

		if (!search) setSearch(querySearch);
		if (!type) setType(queryType);
		if (!limit) setLimit(queryLimit);
	}, [searchParams]);

	useEffect(() => {
		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (type) params.set("type", type);
		if (limit) params.set("limit", limit);

		router.push(`?${params.toString()}`);
	}, [search, type, limit]);

	const toggleFavorite = (pokemon) => {
		if (favorites.some((fav) => fav.id === pokemon.id)) removeFavorite(pokemon.id);
		else addFavorite(pokemon);
	};

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

	return (
		<PokemonContext.Provider value={{
			pokemonList,
			setPokemonList,
			favorites,
			setFavorites,
			search,
			setSearch,
			type,
			setType,
			limit,
			setLimit,
			progress,
			setProgress,
			toggleFavorite
		}}>
			{children}
		</PokemonContext.Provider>
	);
};

export const usePokemonContext = () => useContext(PokemonContext);
