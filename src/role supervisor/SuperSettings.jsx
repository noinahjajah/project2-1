import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '../context/PeopleContext';
import './Dashboard.css';
import './Settings.css';

const roleTabs = ['Admin', 'Technician', 'Supervisor', 'Executive'];

const statusLabel = {
  active: 'Active',
  inactive: 'Inactive',
};

export default function Settings() {
  const [activeRole, setActiveRole] = useState('Admin');
  const navigate = useNavigate();
  const { supervisors, technicians, removeTechnician, removeSupervisor } = usePeople();

  const users = useMemo(
    () => [
      ...technicians.map((t) => ({
        id: t.id,
        name: t.name,
        email: t.email,
        phone: t.phone,
        dept: t.departmentId || '-',
        role: 'Technician',
        status: 'active',
        createdAt: t.createdAt?.slice(0, 10) || '',
      })),
      ...supervisors.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        phone: s.phone,
        dept: s.departmentId || '-',
        role: 'Supervisor',
        status: 'active',
        createdAt: s.createdAt?.slice(0, 10) || '',
      })),
    ],
    [technicians, supervisors],
  );

  const filteredUsers = useMemo(
    () => users.filter((u) => u.role === activeRole),
    [users, activeRole],
  );

  const totalUsers = users.length;

  const handleDeleteUser = (user) => {
    if (user.role === 'Technician') {
      removeTechnician(user.id);
    } else if (user.role === 'Supervisor') {
      removeSupervisor(user.id);
    } else {
      alert('ตอนนี้ลบได้แค่ Technician กับ Supervisor');
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-shell">
        <header className="settings-header">
          <div>
            <p className="settings-eyebrow">User Management</p>
            <h1 className="settings-title">User Management</h1>
          </div>
          <button className="settings-add-btn" type="button" onClick={() => navigate('/admin/settings/new')}>
            Add new
          </button>
        </header>

        <div className="settings-tabs">
          {roleTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`settings-tab ${activeRole === tab ? 'active' : ''}`}
              onClick={() => setActiveRole(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="settings-card">
          <div className="settings-card-header">
            <h2 className="settings-card-title">User List</h2>
            <p className="settings-card-meta">
              Total user : <strong>{totalUsers}</strong>
            </p>
          </div>
          <div className="settings-table-wrap">
            <table className="settings-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Dept.</th>
                  <th>Status</th>
                  <th>Date created</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="settings-empty">
                      No users in this role yet
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="avatar-placeholder" aria-hidden="true">
                          {user.name?.[0] || 'U'}
                        </div>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.dept}</td>
                      <td>
                        <span className={`status-pill ${user.status}`}>
                          {statusLabel[user.status] || user.status}
                        </span>
                      </td>
                      <td>{user.createdAt}</td>
                      <td className="settings-actions">
                        <button type="button" aria-label="edit user" className="icon-btn">
                          <i className="bi bi-pencil-square" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="delete user"
                          className="icon-btn"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <i className="bi bi-trash" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
