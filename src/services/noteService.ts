import type { Note, NoteTag } from "../types/note";
import axios from "axios";
import type { AxiosResponse } from "axios";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages?: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const queryParams = { ...params };
  if (!queryParams.search || queryParams.search.trim() === "") {
    delete queryParams.search;
  }

  const response: AxiosResponse<FetchNotesResponse> = await axios.get(
    BASE_URL,
    {
      headers,
      params: queryParams,
    }
  );
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(BASE_URL, note, {
    headers,
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.delete(
    `${BASE_URL}/${id}`,
    {
      headers,
    }
  );
  return response.data;
};
