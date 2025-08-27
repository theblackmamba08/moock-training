const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <div>
            {personsToShow.map(person => (
                <p key={person.id}>
                    {person.name} {person.number} 
                    <button onClick={() => handleDelete(person.id, person.name)}>Supprimer</button>
                </p>
            ))}
        </div>
    )
}

export default Persons