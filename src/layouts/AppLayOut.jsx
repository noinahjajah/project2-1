import AppHeader from '../component/searchbar';
import AppSideBar from '../component/AppSideBar';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <AppSideBar />
      <div className="app-main">
        <AppHeader />
        <div className="app-content">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
