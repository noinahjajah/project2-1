import './searchbar.css';

const filters = ['All jobs', 'New', 'In progress', 'Completed'];

const searchbar = () => {
  return (
    <header className="app-header">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search job, client, or tag"
          className="search-input"
        />
        <button className="search-filter-btn">Filters</button>
      </div>

      <div className="header-actions">
        <div className="header-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`header-tab ${filter === 'All jobs' ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="header-profile">
          <div className="header-profile-info">
            <p className="header-profile-name">Alex Morgan</p>
            <p className="header-profile-role">Project lead</p>
          </div>
          <div className="header-profile-avatar">AM</div>
        </div>
      </div>
    </header>
  );
};

export default searchbar ;
