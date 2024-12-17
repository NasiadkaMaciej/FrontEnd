'use client';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet.</p>
      ) : (
        <ul>
          {favorites.map((id) => (
            <li key={id}>Pokémon ID: {id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
