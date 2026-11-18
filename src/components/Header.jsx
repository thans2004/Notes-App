
import { Search, Plus } from "lucide-react";

function Header({ search, setSearch, onAdd, count }) {
  return (
    <header className="header">
      <div>
        <p className="welcome">YOUR PERSONAL WORKSPACE</p>
        <h1>My Notes <span>✦</span></h1>
        <p className="subtitle">
          Capture your thoughts and keep everything organized.
        </p>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="mobile-add" onClick={onAdd}>
          <Plus size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;
