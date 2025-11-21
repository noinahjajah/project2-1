import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layouts/AppLayOut';
import Login from './page/Login';
import JobList from './page/JobList';
import Dashboard from './page/Dashboard';

const RedirectToDashboard = () => <Navigate to="/dashboard" replace />;

function App() {
  return (
    <BrowserRouter basename="/Techjob-27">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="joblist" element={<JobList />} />
        </Route>
        <Route path="*" element={<RedirectToDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
