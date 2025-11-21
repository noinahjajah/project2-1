import { NavLink } from 'react-router-dom';
import './AppSideBar.css';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', badge: null },
  { label: 'Joblist', to: '/joblist', badge: null },
  { label: 'Candidates', to: '/candidates', badge: null },
  { label: 'Create Job', to: '/create-job', badge: null },
  { label: 'Messages', to: '/messages', badge: null },
  { label: 'Settings', to: '/settings', badge: null },
];

const AppSideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-section-label">Menu</p>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.label} className="sidebar-nav-item">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <span>{item.label}</span>
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AppSideBar;
