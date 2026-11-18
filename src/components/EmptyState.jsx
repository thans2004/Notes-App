
import { StickyNote, Plus } from "lucide-react";

function EmptyState({ onAdd }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <StickyNote size={45} />
      </div>

      <h2>No notes found</h2>
      <p>Your workspace is waiting for your first idea.</p>

      <button className="add-btn" onClick={onAdd}>
        <Plus size={18} /> Create Your First Note
      </button>
    </div>
  );
}

export default EmptyState;
