// app/pokemon/[id]/layout.js
import Link from 'next/link';

export default function PokemonDetailLayout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/pokemon">Back to List</Link>
      </nav>
      {children}
    </div>
  );
}
