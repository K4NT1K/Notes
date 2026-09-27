import type { Note } from "./types.ts"
import styles from "./css/CreateNoteForm.module.css"
import { useForm, type SubmitHandler } from "react-hook-form"

interface Props {
  onSubmit: (note: Omit<Note, "id">) => void
}

type CreateNoteFormValues = {
  title: string
  content: string
  hidden: boolean
  tags: string
}

export default function CreateNoteForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateNoteFormValues>({
    mode: "onBlur",
  })

  const handleFormSubmit: SubmitHandler<CreateNoteFormValues> = (data) => {
    onSubmit({
      title: data.title.trim(),
      content: data.content.trim(),
      createdAt: new Date(),
      hidden: data.hidden,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => !!tag),
    })
    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          {...register("title", {
            validate: (value) => {
              return value.trim().length > 0 ? true : "Title is required"
            },
          })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>
      <div className={styles.field}>
        <textarea className={styles.textarea} placeholder="Write something..." {...register("content")} />
      </div>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="tag1, tag2, tag3"
          {...register("tags", {
            validate: (value) => {
              const tags = value
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => !!tag)
              return tags.length > 5 ? "Max 5 tags allowed" : true
            },
          })}
        />
        {errors.tags && <p className={styles.error}>{errors.tags.message}</p>}
      </div>
      <div className={styles.field}>
        <label>
          <input type="checkbox" {...register("hidden")} />
          Hidden
        </label>
      </div>
      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        Add note
      </button>
    </form>
  )
}
