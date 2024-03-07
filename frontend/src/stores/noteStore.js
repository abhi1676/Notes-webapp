import { create } from 'zustand';
import axios from 'axios';

const noteStore = create((set) => ({
    notes: null,

    createForm: {
        title: "",
        body: "",
    },

    updateForm: {
        _id: null,
        title: "",
        body: "",
    },

    showBodyId: null, // State to store the ID of the note whose body is being shown

    fetchNotes: async () => {
        try {
            const res = await axios.get("http://localhost:3001/notes");
            set({ notes: res.data.notes });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    },

    updateCreateFormfield: (e) => {
        const { name, value } = e.target;
        set((state) => ({
            createForm: {
                ...state.createForm,
                [name]: value,
            },
        }));
    },

    createNote: async (e) => {
        e.preventDefault();
        const { createForm, notes } = noteStore.getState();
        const res = await axios.post("http://localhost:3001/notes", createForm);
        set({
            notes: [...notes, res.data.note],
            createForm: {
                title: "",
                body: "",
            },
        });
    },

    deleteNote: async (_id) => {
        const res = await axios.delete(`http://localhost:3001/notes/${_id}`);
        const { notes } = noteStore.getState();
        const newNotes = notes.filter((note) => note._id !== _id);
        set({ notes: newNotes });
    },

    handleupdateFieldchange: (e) => {
        const { value, name } = e.target;
        set((state) => ({
            updateForm: {
                ...state.updateForm,
                [name]: value,
            },
        }));
    },

    toggleUpdate: ({ _id, title, body }) => {
        set({
            updateForm: {
                title,
                body,
                _id,
            },
        });
    },

    updateNote: async (e) => {
        e.preventDefault();
        const { title, body, _id } = noteStore.getState().updateForm;
        const { notes } = noteStore.getState();
        const res = await axios.put(`http://localhost:3001/notes/${_id}`, { title, body });
        const newNotes = [...notes];
        const noteIndex = notes.findIndex((note) => note._id === _id);
        newNotes[noteIndex] = res.data.note;
        set({
            notes: newNotes,
            updateForm: {
                _id: null,
                title: "",
                body: "",
            },
        });
    },

    toggleBody: (noteId) => {
        set((state) => ({
            showBodyId: state.showBodyId === noteId ? null : noteId,
        }));
    },
}));

export default noteStore;
