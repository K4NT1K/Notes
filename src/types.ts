export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  hidden: boolean
  tags: string[]
}

export interface NoteDTO {
  id: string
  title: string
  content: string
  createdAt: string
  hidden: boolean
  tags: string[]
}
