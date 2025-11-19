import './AppHeader.css';

const AppHeader = () => {
  return (
    <header className="hero-header">
      <div className="hero-brand">
        <p className="hero-brand-title">TechJob</p>
        <p className="hero-brand-count">27</p>
      </div>

      <div className="hero-profile-card">
        <div className="hero-profile-meta">
          <p className="hero-profile-name">Alex Morgan</p>
          <p className="hero-profile-role">Project Lead</p>
        </div>
        <div className="hero-profile-avatar">
          <span>Profile</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
