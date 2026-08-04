"use client";

import css from "@/app/notes/[id]/NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <main className={css.main}>
        <p>Loading, please wait...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className={css.main}>
        <p>Something went wrong.</p>
      </main>
    );
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data && data.title}</h2>
          </div>
          <p className={css.tag}>{data && data.tag}</p>
          <p className={css.content}>{data && data.content}</p>
          <p className={css.date}>{data && data.createdAt}</p>
        </div>
      </div>
    </main>
  );
}
