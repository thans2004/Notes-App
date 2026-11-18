
import { useState } from "react";
import { X } from "lucide-react";

function NoteForm({ onClose, onSave, editingNote }) {
  const [title, setTitle] = useState(editingNote?.title || "");
  const [description, setDescription] = useState(
    editingNote?.description || ""
  );
  const [category, setCategory] = useState(
    editingNote?.category || "Personal"
  );
  const [tags, setTags] = useState(editingNote?.tags || "");
  const [color, setColor] = useState(editingNote?.color || "purple");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }

    onSave({
      id: editingNote?.id || Date.now(),
      title,
      description,
      category,
      tags,
      color,
      pinned: editingNote?.pinned || false,
      date: new Date().toLocaleDateString()
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="note-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Note Title</label>
          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Write your thoughts here..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Ideas</option>
          </select>

          <label>Tags (comma separated)</label>
          <input
            placeholder="javascript, learning, project"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label>Choose Note Color</label>
          <div className="color-options">
            {["purple", "blue", "pink", "green", "yellow"].map(c => (
              <button
                type="button"
                key={c}
                className={`color-circle ${c} ${color === c ? "selected" : ""}`}
                onClick={() => setColor(c)}
                aria-label={c}
              />
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingNote ? "Update Note" : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
