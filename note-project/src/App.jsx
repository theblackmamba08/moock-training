import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';


const App = () => {

	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState('some error happened...')

	useEffect(() => {
		noteService
			.getAllNotes()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	const handleNoteChange = (event) => setNewNote(event.target.value)
	
	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		}

		noteService
			.createNote(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.updateNote(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(n => n.id !== id ? n : returnedNote));
			})
			.catch(error => {
				setErrorMessage(`the note '${note.content}' was already deleted from server`);
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000);
				setNotes(notes.filter(n => n.id !== id));
			});
	};

	const deleteNote = id => {
		if (window.confirm("Are you sure you want to delete this note?")) {
			noteService
				.deleteNote(id)
				.then(() => {
					setNotes(notes.filter(n => n.id !== id));
				})
				.catch(error => {
					alert(`the note was already deleted from server`);
					setNotes(notes.filter(n => n.id !== id));
				});
			return;
		}
	};

	const notesToShow = showAll ? notes : notes.filter(note => note.important)

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all' }
				</button>
			</div>
			<ul>
				{notesToShow.map(note => (
					<Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} deleteFunction={()=>deleteNote(note.id)} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input 
					value={newNote}
					onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
			<Footer />
		</div>
	);
};

export default App;