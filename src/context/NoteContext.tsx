import { createContext } from "react";
import { ReactNode } from "react-markdown/lib/ast-to-react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

export type TagsProps = {
  id: string;
  label: string;
};

export type NotesProps = {
  id: string;
  title: string;
  tags: string[];
  body: string;
};

type NotesContextProps = {
  notes: NotesProps[];
  getNote: (id: string) => NotesProps;
  addNote: (title: string, tags: string[], body: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (newNote: NotesProps) => void;
  allTags: TagsProps[];
  deleteTag: (label: string) => void;
  updateTag: (id: string, label: string) => void;
};

export const NoteContext = createContext({} as NotesContextProps);

export default function NoteProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useLocalStorage<NotesProps[]>("notes", []);
  const [allTags, setAllTags] = useLocalStorage<TagsProps[]>("tags", []);

  function addNote(title: string, tags: string[], body: string) {
    setNotes((prev) => [
      ...prev,
      {
        id: uuidV4(),
        title: title,
        tags: tags,
        body: body,
      },
    ]);
    addTag(tags);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function getNote(id: string) {
    return notes.find((note) => note.id === id)!;
  }
  function updateNote(newNote: NotesProps) {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === newNote.id) {
          return newNote;
        }
        return note;
      })
    );
    addTag(newNote.tags);
  }
  function addTag(tags: string[]) {
    const uniqueTags = Array.from(
      new Set([...tags, ...allTags.map((tag) => tag.label)])
    );
    setAllTags(
      uniqueTags.map((tag) => {
        return { label: tag, id: uuidV4() };
      })
    );
  }
  function deleteTagFromNote(deletedTag: string) {
    setNotes((prev) =>
      prev.map((note) => {
        return {
          ...note,
          tags: note.tags.filter((tag) => tag !== deletedTag),
        };
      })
    );
  }
  function deleteTag(id: string) {
    let deletedTag = allTags.find((tag) => tag.id === id)!.label;
    setAllTags((prev) => prev.filter((tags) => tags.id !== id));
    deleteTagFromNote(deletedTag);
  }
  function updateTagInNote(oldLabel: string, newLabel: string) {
    setNotes((prev) =>
      prev.map((note) => {
        return {
          ...note,
          tags: note.tags.map((tag) => {
            if (tag === oldLabel) {
              return newLabel;
            }
            return tag;
          }),
        };
      })
    );
  }
  function updateTag(id: string, label: string) {
    const oldLabel = allTags.find((tag) => tag.id === id)!.label;
    setAllTags((prev) =>
      prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label: label };
        }
        return tag;
      })
    );
    updateTagInNote(oldLabel, label);
  }
  return (
    <NoteContext.Provider
      value={{
        notes,
        getNote,
        addNote,
        deleteNote,
        updateNote,
        allTags,
        deleteTag,
        updateTag,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
