import type {Note} from "./types.ts";
import {useState} from "react";
import styles from "./css/CreateNoteForm.module.css"

interface Props {
    onSubmit: (note: Note) => void
}

export default function CreateNoteForm({onSubmit}: Props) {
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')

    const [content, setContent] = useState('')
    const [hidden, setHidden] = useState(false)

    const [tags, setTags] = useState<string>('')
    const [tagsError, setTagsError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const currentTitle = title.trim()
        if (currentTitle.length === 0) {
            setTitleError('Title is required')
            return
        }

        const currentTags = tags.split(',').map((tag) => tag.trim()).filter((tag) => !!tag)
        if (currentTags.length > 5) {
            setTagsError('Max 5 tags')
            return
        }

        const note: Note = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date(),
            hidden: hidden,
            tags: currentTags
        }
        onSubmit(note)
        setTitle('')
        setContent('')
        setHidden(false)
        setTags('')
        setTitleError('')
        setTagsError('')
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <input className={styles.input} type="text" placeholder="Title" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                {titleError && <p className={styles.error}>{titleError}</p>}
            </div>
            <div className={styles.field}>
                <textarea className={styles.textarea} placeholder="Write something..." value={content} onChange={(e) => {
                    setContent(e.target.value)
                }}/>
            </div>
            <div className={styles.field}>
                <input className={styles.input} type="text" placeholder="tag1, tag2, tag3" value={tags} onChange={(e) => {
                    setTags(e.target.value)
                }}/>
                {tagsError && <p className={styles.error}>{tagsError}</p>}
            </div>
            <div className={styles.field}>
                <label>
                    <input type="checkbox" checked={hidden} onChange={(e) => (setHidden(e.target.checked))}/>Hidden
                </label>
            </div>
            <button className={styles.submitButton} type="submit">Add note</button>
        </form>
    )
}
