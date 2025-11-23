import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayOut';
import Login from './page/Login';
import JobList from './role admin/JobList';
import Dashboard from './role admin/Dashboard';
import DashboardT from './role technician/TechnicianDashboard';
// import Report from './role technician/TechnicianReport';
import CreateWS from './role technician/AdminCreateJobPage';

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const target = user.role === 'technician' ? '/tech/dashboard' : '/admin/dashboard';
  return <Navigate to={target} replace />;
};

const ProtectedLayout = ({ requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout role={user.role} />;
};

function App() {
  return (
    <BrowserRouter basename="/Techjob-27">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardT/>} />
          <Route path="joblist" element={<JobList />} />
          <Route path="Reports" element={<Report/>} />
          <Route path="Create" element={<CreateWS />} />
        </Route>
        <Route path="*" element={<RedirectToDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
