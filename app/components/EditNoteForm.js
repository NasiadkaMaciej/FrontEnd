import React, { useState, useEffect } from 'react';
import { usePokemonContext } from "../context/PokemonContext";

const EditNoteForm = ({ noteId, onSave }) => {
	const [note, setNote] = useState(null);

	useEffect(() => {
		const notes = JSON.parse(localStorage.getItem('notes')) || [];
		const noteToEdit = notes.find(n => n.id === noteId);
		setNote(noteToEdit);
	}, [noteId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNote(prevNote => ({ ...prevNote, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const notes = JSON.parse(localStorage.getItem('notes')) || [];
		const updatedNotes = notes.map(n => n.id === noteId ? { ...note, updatedAt: new Date().toISOString() } : n);
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
		onSave(note);
	};

	if (!note) return <p>Loading...</p>;
	const { pokemonTypes } = usePokemonContext();

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="tacticName">Tactic Name</label>
				<input type="text" name="tacticName" value={note.tacticName} onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="strategy">Strategy</label>
				<input type="text" name="strategy" value={note.strategy} onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="effectiveness">Effectiveness</label>
				<select name="effectiveness" value={note.effectiveness} onChange={handleChange}>
					{[1, 2, 3, 4, 5].map(value => (
						<option key={value} value={value}>{value}</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="conditions">Conditions</label>
				<input type="text" name="conditions" value={note.conditions} onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="trainingDate">Training Date</label>
				<input type="date" name="trainingDate" value={note.trainingDate} onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="opponents">Opponents</label>
				<select name="opponents" value={note.opponents} onChange={handleChange} multiple>
					{pokemonTypes.map(type => (
						<option key={type} value={type}>{type}</option>
					))}
				</select>
			</div>
			<button type="submit">Save Changes</button>
		</form>
	);
};

export default EditNoteForm;