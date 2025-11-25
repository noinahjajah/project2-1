import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AppSideBar.css';
import joblistLogo from '../../pic/joblist-logo.png';

const adminNav = [
  { label: 'Dashboard', to: '/admin/dashboard', badge: null },
  { label: 'Joblist', to: '/admin/joblist', badge: null },
];

const techNav = [
  { label: 'Dashboard', to: '/tech/dashboard', badge: null },
  { label: 'Create Job', to: '/tech/create-job', badge: null },
  { label: 'Work Sheet', to: '/tech/work-sheet', badge: null },
  { label: 'Print Work Sheet', to: '/tech/work-sheet/print', badge: null },
];

const AppSideBar = ({ role }) => {
  const navItems = role === 'technician' ? techNav : adminNav;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" />

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
                <span className="sidebar-link-main">
                  {item.label === 'Joblist' ? (
                    <img src={joblistLogo} alt="" className="sidebar-link-icon" />
                  ) : (
                    <span className="sidebar-link-dot" aria-hidden="true" />
                  )}
                  <span className="sidebar-link-label">{item.label}</span>
                </span>
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        <button className="sidebar-logout-btn" type="button" onClick={handleLogout}>
          <span className="sidebar-logout-icon" aria-hidden="true">⏻</span>
          <span className="sidebar-link-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSideBar;
