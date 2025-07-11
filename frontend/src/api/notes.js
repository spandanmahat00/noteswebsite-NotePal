import axios from "./axios";

const BASE = `${import.meta.env.VITE_BACKEND_URL}/api/notes`;

export const getNotes = () => axios.get(BASE);
export const getNote = (id) => axios.get(`${BASE}/${id}`);
export const createNote = (title, text) => axios.post(BASE, { title, text });
export const updateNote = (id, title, text) =>
  axios.put(`${BASE}/${id}`, { title, text });
export const deleteNote = (id) => axios.delete(`${BASE}/${id}`);
