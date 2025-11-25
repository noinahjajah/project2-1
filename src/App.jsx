import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayOut';
import Login from './page/Login';
import JobList from './role admin/JobList';
import Dashboard from './role admin/Dashboard';
import TechnicianDashboard from './role technician/TechnicianDashboard';
import AdminCreateJobPage from './role technician/AdminCreateJobPage';
import TechnicianWorkSheetForm from './role technician/TechnicianWorkSheetForm';
import TechnicianWorkSheetPrint from './role technician/TechnicianWorkSheetPrint';
import JobDetail from './role admin/JobDetail';

const RoleRedirect = () => {
  const { user } = useAuth();

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
    <AuthProvider>
      <BrowserRouter basename="/Techjob-27">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RoleRedirect />} />

          <Route element={<ProtectedLayout requiredRole="admin" />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/joblist" element={<JobList />} />
            <Route path="/admin/job/:id" element={<JobDetail />} />
          </Route>

          <Route element={<ProtectedLayout requiredRole="technician" />}>
            <Route path="/tech/dashboard" element={<TechnicianDashboard />} />
            <Route path="/tech/create-job" element={<AdminCreateJobPage />} />
            <Route path="/tech/work-sheet" element={<TechnicianWorkSheetForm />} />
            <Route path="/tech/work-sheet/print" element={<TechnicianWorkSheetPrint />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
