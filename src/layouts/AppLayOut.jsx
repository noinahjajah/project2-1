import { Outlet } from 'react-router-dom';
import AppHeader from '../component/AppHeader';
import AppSideBar from '../component/AppSideBar';
import './AppLayout.css';

const AppLayout = ({ role }) => {
  return (
    <div className="app-shell">
      <AppHeader role={role} />
      <div className="app-body">
        <AppSideBar role={role} />
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
