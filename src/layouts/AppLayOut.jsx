import { Outlet } from 'react-router-dom';
import AppHeader from '../component/AppHeader';
import AppSideBar from '../component/AppSideBar';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="app-shell">
      <AppHeader />
      <div className="app-body">
        <AppSideBar />
        <div className="app-main">
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
