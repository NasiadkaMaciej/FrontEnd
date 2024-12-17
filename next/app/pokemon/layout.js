// app/pokemon/layout.js
export default function PokemonLayout({ children }) {
    return (
      <div>
        <header>
          <h1>Pokédex</h1>
        </header>
        <section>
          {children}
        </section>
      </div>
    );
  }
  