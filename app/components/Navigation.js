const Navigation = ({progress, searchTerm, setSearchTerm }) => {
  return (
    <header>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f8d030' }}>
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
      </nav>
      <h1>Pokédex</h1>
      <p>
        Loaded {progress} / 1302 Pokémon
      </p>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
};

export default Navigation;
