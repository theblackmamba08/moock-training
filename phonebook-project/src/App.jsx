import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
	const [allPersons, setAllPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [errorMessage, setErrorMessage] = useState('some error happened...')
	const [successMessage, setSuccessMessage] = useState('');


	useEffect(() => {
		noteService
			.getAllPerson()
			.then(initialPersons => {				
				setAllPersons(initialPersons)
			})
	}, [])

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		if (!newName || !newNumber) {
			alert('Please enter a name and a number')
			return
		}
		
		if (allPersons.some(person => person.number === newNumber)) {
			alert(`${newNumber} is already added to phonebook`)
			return
		}

		const existingPerson = allPersons.find(person => person.name === newName)
		if (existingPerson) {
			if (window.confirm(`${newName} est déjà dans le répertoire. Voulez-vous remplacer l'ancien numéro par le nouveau ?`)) {
				const updatedPerson = { ...existingPerson, number: newNumber }
				noteService
					.updatePerson(existingPerson.id, updatedPerson)
					.then(returnedPerson => {
						setAllPersons(allPersons.map(person =>
							person.id !== existingPerson.id ? person : returnedPerson
						))
						setNewName('')
						setNewNumber('')
					})
					.catch(error => {
						alert(`La modification a échoué. L'entrée a peut-être déjà été supprimée du serveur.`)
						setAllPersons(allPersons.filter(person => person.id !== existingPerson.id))
					})
			}
			return
		}

		const personObject = {
			name: newName,
			number: newNumber,
		}

		noteService
			.createPerson(personObject)
			.then(returnedPerson => {
				setAllPersons(allPersons.concat(returnedPerson))
				setSuccessMessage('Enregistrement réussi !');
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
				setNewName('')
				setNewNumber('')
			})
	}

	const personsToShow = newSearch
		? allPersons.filter(person =>
				person.name.toLowerCase().includes(newSearch.toLowerCase())
			)
		: allPersons

	const handleDelete = (id, name) => {
		if (window.confirm(`Voulez-vous vraiment supprimer ${name} ?`)) {
			noteService.deletePerson(id)
				.then(() => {
					setAllPersons(allPersons.filter(person => person.id !== id))
				})
				.catch(error => {
					setErrorMessage(`La suppression a échoué. L'entrée a peut-être déjà été supprimée du serveur.`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
					setAllPersons(allPersons.filter(person => person.id !== id))
				})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			{errorMessage && <ErrorNotification message={errorMessage} />}
			{successMessage && <SuccessNotification message={successMessage} />}
			<Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
			<h2>Add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} handleDelete={handleDelete} />
		</div>
	)
 }
 
export default App