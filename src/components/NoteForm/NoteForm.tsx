import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../services/noteService";

import type { CreateNoteParams } from "../../types/note";

import css from "./NoteForm.module.css";

const initialForm: CreateNoteParams = {
  title: "",
  content: "",
  tag: "Personal",
};

interface NoteFormProps {
  onClose: () => void;
}

export const NoteForm = ({ onClose }: NoteFormProps) => {
  const [form, setForm] = useState<CreateNoteParams>(initialForm);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setForm(initialForm);
      onClose();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className={css.input}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
        className={css.textarea}
      />
      <select
        name="tag"
        value={form.tag}
        onChange={handleChange}
        required
        className={css.select}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Todo">Todo</option>
        <option value="Shopping">Shopping</option>
        <option value="Meeting">Meeting</option>
      </select>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className={css.button}
      >
        {mutation.isLoading ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
};
