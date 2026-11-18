
import { Pin, Pencil, Trash2 } from "lucide-react";

function NoteCard({ note, onEdit, onDelete, onPin }) {
  return (
    <div className={`note-card ${note.color}`}>
      <div className="note-top">
        <span className="category-tag">{note.category}</span>

        <button
          className={`pin-btn ${note.pinned ? "pinned" : ""}`}
          onClick={() => onPin(note.id)}
          title="Pin note"
        >
          <Pin size={18} />
        </button>
      </div>

      <h3>{note.title}</h3>

      <p className="note-description">{note.description}</p>

      <div className="note-tags">
        {note.tags.split(",").filter(Boolean).map((tag, index) => (
          <span key={index}>#{tag.trim()}</span>
        ))}
      </div>

      <div className="note-footer">
        <span>{note.date}</span>

        <div className="note-actions">
          <button onClick={() => onEdit(note)}>
            <Pencil size={16} />
          </button>

          <button onClick={() => onDelete(note.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
