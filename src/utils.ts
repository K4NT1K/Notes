import type {Note, NoteDTO} from './types.ts';

export function mapNoteFromDTO(note: NoteDTO): Note {
  return {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: new Date(note.createdAt),
      hidden: note.hidden,
      tags: note.tags
  }
}