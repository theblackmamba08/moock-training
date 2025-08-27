import axios from 'axios';

const baseUrl = 'http://localhost:3000/notes';

const getAllNotes = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const createNote = newObject => {
	const request = axios.post(baseUrl, newObject);
	return request.then(response => response.data);
};

const updateNote = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then(response => response.data);
};

const deleteNote = id => {
    return axios.delete(`${baseUrl}/${id}`);
};

export default {
	getAllNotes,
	createNote,
	updateNote,
    deleteNote
};