import { useState } from "react";

import css from "./App.module.css";

import { NoteForm } from "../NoteForm/NoteForm";
import { NoteList } from "../NoteList/NoteList";
import { SearchBox } from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import { Pagination } from "../Pagination/Pagination";

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = 5;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.topRow}>
          <div className={css.left}>
            <SearchBox
              onSearch={(q) => {
                setSearch(q);
                setPage(1);
              }}
            />
          </div>

          <div className={css.center}>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>

          <div className={css.right}>
            <button className={css.button} onClick={openModal}>
              Add Note
            </button>
          </div>
        </div>
      </header>

      <NoteList page={page} setPage={setPage} search={search} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
