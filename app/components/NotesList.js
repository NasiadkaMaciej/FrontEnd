import React from 'react';

const NotesList = ({ pokemonId, notes, onEdit, onDelete }) => {
	const pokemonNotes = notes.filter(note => note.pokemonId === pokemonId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<div>
			<h3>Notes</h3>
			<ul>
				{pokemonNotes.map(note => (
					<span key={note.id}>
						<h4>{note.tacticName}</h4>
						<li>
							<p><strong>Strategy:</strong> {note.strategy}</p>
							<p><strong>Effectiveness:</strong> {note.effectiveness}</p>
							<p><strong>Conditions:</strong> {note.conditions}</p>
							<p><strong>Training Date:</strong> {note.trainingDate}</p>
							<p><strong>Opponents:</strong> {note.opponents.join(", ")}</p>
							{/*<p><strong>Created At:</strong> {note.createdAt}</p>
							<p><strong>Updated At:</strong> {note.updatedAt}</p>*/}
						</li>
						<button onClick={() => onEdit(note.id)}>Edit</button>
						<button onClick={() => onDelete(note.id)}>Delete</button>
					</span>
				))}
			</ul>
		</div>
	);
};

export default NotesList;