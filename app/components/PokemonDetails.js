import React, { useState } from 'react';
import AddNoteForm from './AddNoteForm';
import EditNoteForm from './EditNoteForm';
import NotesList from './NotesList';

const PokemonDetails = ({ pokemon }) => {
	const [isAddingNote, setIsAddingNote] = useState(false);
	const [editingNoteId, setEditingNoteId] = useState(null);
	const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);

	const handleSaveNote = (note) => {
		setIsAddingNote(false);
		setEditingNoteId(null);
		setNotes(JSON.parse(localStorage.getItem('notes')) || []);
	};

	const handleEditNote = (noteId) => {
		setEditingNoteId(noteId);
	};

	const handleDeleteNote = (noteId) => {
		const updatedNotes = notes.filter(note => note.id !== noteId);
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
		setNotes(updatedNotes);
	};

	if (!pokemon) return <p>Select a Pokémon to see details.</p>;

	return (
		<div id="details">
			<h2>{pokemon.name}</h2>
			<img src={pokemon.gif} alt={pokemon.name} />
			<ul>
				<li><strong>Height:</strong> {pokemon.height * 10} cm</li>
				<li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
				<li><strong>Types:</strong> {pokemon.types.join(", ")}</li>
				<li><strong>Abilities:</strong> {pokemon.abilities.join(", ")}</li>
				<li>
					<strong>Stats:</strong>
					<ul>
						{pokemon.stats.map(({ name, base_stat }) => (
							<li key={name}>
								<strong>{name}:</strong> {base_stat}
							</li>
						))}
					</ul>
				</li>
			</ul>
			<button onClick={() => setIsAddingNote(true)}>New Training Note</button>
			{isAddingNote && <AddNoteForm pokemonId={pokemon.id} onSave={handleSaveNote} />}
			{editingNoteId && <EditNoteForm noteId={editingNoteId} onSave={handleSaveNote} />}
			<NotesList pokemonId={pokemon.id} notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
		</div>
	);
};

export default PokemonDetails;