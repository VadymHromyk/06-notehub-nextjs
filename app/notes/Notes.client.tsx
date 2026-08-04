"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import css from "@/app/notes/Note.clients.module.css";
import { fetchNotes } from "@/lib/api/api";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default function NoteClient() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setQuery(value);
  }, 500);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchQuery} />
        {data && data.totalPages > 1 && (
          //   <Pagination
          //     currentPage={currentPage}
          //     setCurrentPage={setCurrentPage}
          //     totalPages={data && data.totalPages > 0 ? data.totalPages : 1}
          //   />
          <div>pagination!!!</div>
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {/* {isLoading && <Loader />} */}
      {/* {isError && <ErrorMessage message={error.message} />} */}
      {/* {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        "nothing to show"
      )} */}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
