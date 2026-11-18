
import { Home, Pin, Tag, Moon, Sun, Plus, StickyNote } from "lucide-react";

function Sidebar({ active, setActive, dark, setDark, onAdd, notes }) {
  const categories = ["Personal", "Work", "Study", "Ideas"];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <StickyNote size={25} />
        </div>
        <h2>NoteFlow<span>.</span></h2>
      </div>

      <button className="add-btn" onClick={onAdd}>
        <Plus size={19} /> Create New Note
      </button>

      <p className="menu-label">MENU</p>

      <button
        className={`side-link ${active === "All" ? "active" : ""}`}
        onClick={() => setActive("All")}
      >
        <Home size={19} /> All Notes
        <span>{notes.length}</span>
      </button>

      <button
        className={`side-link ${active === "Pinned" ? "active" : ""}`}
        onClick={() => setActive("Pinned")}
      >
        <Pin size={19} /> Pinned
      </button>

      <p className="menu-label">CATEGORIES</p>

      {categories.map((category) => (
        <button
          key={category}
          className={`side-link ${active === category ? "active" : ""}`}
          onClick={() => setActive(category)}
        >
          <Tag size={17} />
          {category}
          <span>
            {notes.filter(n => n.category === category).length}
          </span>
        </button>
      ))}

      <div className="sidebar-bottom">
        <button className="side-link theme-btn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={19} /> : <Moon size={19} />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <p>Made with ❤️ using React</p>
      </div>
    </aside>
  );
}

export default Sidebar;
