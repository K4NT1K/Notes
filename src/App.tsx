import type {Note, NoteDTO} from "./types"
import {useEffect, useState} from "react";
import NoteCard from "./NoteCard.tsx"
import CreateNoteForm from "./CreateNoteForm.tsx";
import {mapNoteFromDTO} from "./utils.ts";
import {API_URL} from "./config.ts";
import styles from "./css/App.module.css"

function App() {
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(() => {
        fetch(`${API_URL}/notes`)
            .then((res) => {
                if (!res.ok) throw new Error(`${res.status}`)
                return res.json()
            })
            .then((data: NoteDTO[]) => setNotes(data.map(mapNoteFromDTO)))
    }, []);

    const handleSubmit = (note: Note) => {
        fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then((res) => res.json())
            .then((note: NoteDTO) => {
                setNotes(data => [...data, mapNoteFromDTO(note)])
            })
    }

    const handleDelete = (id: string) => {
        fetch(`${API_URL}/notes/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Failed to delete note')
                }
                return fetch(`${API_URL}/notes`)
            })
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Failed to fetch notes')
                }
                return res.json()
            })
            .then((data: NoteDTO[]) => setNotes(data.map(mapNoteFromDTO)))
            .catch((error) => {
                console.error('Error deleting note:', error)
            })
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Notes</h1>
            <CreateNoteForm onSubmit={handleSubmit}/>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDelete}/>
            ))}
        </div>
    )
}

export default App
