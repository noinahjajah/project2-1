import './AppSideBar.css';

const navItems = [
  { label: 'Dashboard', badge: null },
  { label: 'Joblist', badge: null },
  { label: 'Candidates', badge: null },
  { label: 'Create Job', badge: null },
  { label: 'Messages', badge: null },
  { label: 'Settings', badge: null },
];

const AppSideBar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">TJ</div>
        <div>
          <p className="brand-label">Tech</p>
          <p className="brand-name">Job</p>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-label">Menu</p>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li
              key={item.label}
              className={`sidebar-nav-item ${
                item.label === 'Joblist' ? 'active' : ''
              }`}
            >
              <span>{item.label}</span>
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section sidebar-card">
        <p className="sidebar-section-label">Opening Roles</p>
        <div className="sidebar-card-content">
          <div>
            <p className="sidebar-card-stat">12</p>
            <p className="sidebar-card-caption">Open roles</p>
          </div>
          <div>
            <p className="sidebar-card-stat">57</p>
            <p className="sidebar-card-caption">Applications</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSideBar;
