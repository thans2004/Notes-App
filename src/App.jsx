
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import EmptyState from "./components/EmptyState";

import { Plus, LayoutGrid } from "lucide-react";

import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("my-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");
  const [dark, setDark] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("my-notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = (note) => {
    if (editingNote) {
      setNotes(prev =>
        prev.map(n => n.id === note.id ? note : n)
      );
    } else {
      setNotes(prev => [note, ...prev]);
    }

    setEditingNote(null);
  };

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const pinNote = (id) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    );
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      active === "All" ||
      (active === "Pinned" ? note.pinned : note.category === active);

    return matchesSearch && matchesCategory;
  }).sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const openNewNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className={`app-container ${dark ? "dark" : ""}`}>

      <Sidebar
        active={active}
        setActive={setActive}
        dark={dark}
        setDark={setDark}
        onAdd={openNewNote}
        notes={notes}
      />

      <main className="main-content">

        <Header
          search={search}
          setSearch={setSearch}
          onAdd={openNewNote}
          count={notes.length}
        />

        <section className="notes-section">

          <div className="section-heading">
            <div>
              <h2>
                {active === "All" ? "All Notes" : active}
              </h2>
              <p>You have {filteredNotes.length} notes in this view</p>
            </div>

            <button className="create-btn" onClick={openNewNote}>
              <Plus size={18} /> New Note
            </button>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="notes-grid">
              {filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={editNote}
                  onDelete={deleteNote}
                  onPin={pinNote}
                />
              ))}
            </div>
          ) : (
            <EmptyState onAdd={openNewNote} />
          )}

        </section>

        <footer className="app-footer">
          <LayoutGrid size={15} />
          <span>NoteFlow Workspace • Stay organized, stay creative.</span>
        </footer>

      </main>

      {showForm && (
        <NoteForm
          onClose={closeForm}
          onSave={saveNote}
          editingNote={editingNote}
        />
      )}

    </div>
  );
}

export default App;
