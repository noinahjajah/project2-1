import { useAuth } from '../context/AuthContext';
import './AppHeader.css';

const AppHeader = () => {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'G';

  return (
    <header className="hero-header">
      <div className="hero-brand">
        <p className="hero-brand-title">TechJob</p>
        <p className="hero-brand-count">27</p>
      </div>

      <div className="hero-profile-card">
        <div className="hero-profile-meta">
          <p className="hero-profile-name">{user?.name ?? 'Guest'}</p>
          <p className="hero-profile-role">{user?.role ?? 'No role'}</p>
        </div>
        <div className="hero-profile-avatar">
          <span>{initials}</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
