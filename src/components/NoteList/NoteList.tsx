import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchNotes, deleteNote } from "../../services/noteService";

import css from "./NoteList.module.css";

import type { Note } from "../../types/note";

import { Pagination } from "../Pagination/Pagination";

interface NoteListProps {
  page: number;
  setPage: (page: number) => void;
  search: string;
}

const PER_PAGE = 12;

export const NoteList = ({ page, setPage, search }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes</p>;
  if (!data.notes?.length) return <p>No notes found.</p>;

  const totalPages = data.totalPages ?? Math.ceil(data.total / data.perPage);

  return (
    <>
      <ul className={css.list}>
        {data.notes.map((note: Note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {isFetching && <p>Updating...</p>}
    </>
  );
};
