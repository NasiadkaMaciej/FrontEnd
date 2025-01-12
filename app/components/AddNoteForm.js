import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePokemonContext } from "../context/PokemonContext";

const AddNoteForm = ({ pokemonId, onSave }) => {
	const initialValues = {
		tacticName: '',
		strategy: '',
		effectiveness: '',
		conditions: '',
		trainingDate: '',
		opponents: []
	};

	const validationSchema = Yup.object({
		tacticName: Yup.string().required('Required').min(5).max(50),
		strategy: Yup.string().required('Required').min(10),
		effectiveness: Yup.number().required('Required').min(1).max(5),
		conditions: Yup.string().required('Required').min(10),
		trainingDate: Yup.date().required('Required'),
		opponents: Yup.array().of(Yup.string()).required('Required')
	});

	const handleSubmit = (values, { setSubmitting }) => {
		const notes = JSON.parse(localStorage.getItem('notes')) || [];
		const newNote = {
			...values,
			id: Date.now().toString(),
			pokemonId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
		notes.push(newNote);
		localStorage.setItem('notes', JSON.stringify(notes));
		onSave(newNote);
		setSubmitting(false);
	};
	const { pokemonTypes } = usePokemonContext();

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({ isSubmitting }) => (
				<Form>
					<div>
						<label htmlFor="tacticName">Tactic Name</label>
						<Field type="text" name="tacticName" />
						<ErrorMessage name="tacticName" component="div" />
					</div>
					<div>
						<label htmlFor="strategy">Strategy</label>
						<Field type="text" name="strategy" />
						<ErrorMessage name="strategy" component="div" />
					</div>
					<div>
						<label htmlFor="effectiveness">Effectiveness</label>
						<Field as="select" name="effectiveness">
							<option value="">Select</option>
							{[1, 2, 3, 4, 5].map(value => (
								<option key={value} value={value}>{value}</option>
							))}
						</Field>
						<ErrorMessage name="effectiveness" component="div" />
					</div>
					<div>
						<label htmlFor="conditions">Conditions</label>
						<Field type="text" name="conditions" />
						<ErrorMessage name="conditions" component="div" />
					</div>
					<div>
						<label htmlFor="trainingDate">Training Date</label>
						<Field type="date" name="trainingDate" />
						<ErrorMessage name="trainingDate" component="div" />
					</div>
					<div>
						<label htmlFor="opponents">Opponents</label>
						<Field as="select" name="opponents" multiple>
							{pokemonTypes.map(type => (
								<option key={type} value={type}>{type}</option>
							))}
						</Field>
						<ErrorMessage name="opponents" component="div" />
					</div>
					<button type="submit" disabled={isSubmitting}>Save Note</button>
				</Form>
			)}
		</Formik>
	);
};

export default AddNoteForm;