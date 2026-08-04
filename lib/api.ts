import axios from "axios";
import type { Note } from "@/types/note";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNote = Pick<Note, "title" | "content" | "tag">;

const urlNote = "https://notehub-public.goit.study/api/notes";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${myKey}`,
};

export const fetchNotes = async (
  query: string = "",
  page: number = 1,
  perPage?: number,
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(urlNote, {
    params: {
      search: query,
      page,
      perPage,
    },
    headers,
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`${urlNote}/${id}`, {
    headers,
  });

  return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>(urlNote, newNote, {
    headers,
  });

  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${urlNote}/${noteId}`, {
    headers,
  });

  return res.data;
};
