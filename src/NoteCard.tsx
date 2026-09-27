import type {Note} from "./types.ts";
import styles from "./css/NoteCard.module.css"

interface Props {
    note: Note
    onDelete: (id: string) => void
}

export default function NoteCard({note, onDelete}: Props) {
    const hiddenClass = note.hidden ? `${styles.hidden}` : ''

    return (
        <div className={hiddenClass}>
            <div className={styles.container}>
                <h2 className={styles.noteTitle}>{note.title}</h2>
                <p className={styles.content}>{note.content}</p>
                <div className={styles.row}>
                    <p className={styles.date}>{note.createdAt.toLocaleDateString()}</p>
                    <p className={styles.badge}>{note.hidden ? "Hidden" : "Visible"}</p>
                    {note.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                    <button className={styles.deleteButton} onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}
