import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '../context/PeopleContext';
import { useJobs } from '../context/JobsContext';
import './Settings.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
  position: '',
  status: '',
  supervisorId: '',
};

export default function SettingsCreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const { addTechnician, addSupervisor, supervisors } = usePeople();
  const { jobs } = useJobs();

  const departmentOptions = useMemo(() => {
    const set = new Set(['IT Support']);
    jobs.forEach((job) => {
      if (job.department) set.add(job.department);
    });
    return Array.from(set);
  }, [jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setForm(initialForm);
  const handleCancel = () => navigate(-1);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.position) {
      alert('กรุณาเลือกตำแหน่ง');
      return;
    }

    if (form.position === 'Technician') {
      const deptName = form.department || 'IT Support';

      addTechnician({
        name: form.name,
        email: form.email,
        phone: form.phone,
        // Keep role aligned with department name like seed data
        role: deptName,
        departmentId: deptName.toLowerCase().replace(/\s+/g, '-'),
        supervisorId: form.supervisorId || null,
      });
    } else if (form.position === 'Supervisor') {
      addSupervisor({
        name: form.name,
        email: form.email,
        phone: form.phone,
        department: form.department,
        departmentId: form.department,
      });
    } else {
      alert('ตอนนี้รองรับเฉพาะ Technician / Supervisor');
      return;
    }

    alert('บันทึกสำเร็จ');
    navigate(-1);
  };

  return (
    <div className="create-user-page">
      <div className="create-user-shell">
        <header className="create-user-header">
          <h1>Create New User</h1>
        </header>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-col">
              <label className="form-label">
                ชื่อ-นามสกุล
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Email
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-input"
                />
              </label>
              <label className="form-label">
                เบอร์โทรศัพท์
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="form-input"
                />
              </label>
              <label className="form-label">
                ตำแหน่ง
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">เลือกตำแหน่ง</option>
                  <option value="Admin">Admin</option>
                  <option value="Technician">Technician</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Executive">Executive</option>
                </select>
              </label>
              {form.position === 'Technician' && (
                <label className="form-label">
                  Supervisor
                  <select
                    name="supervisorId"
                    value={form.supervisorId}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">เลือกหัวหน้างาน</option>
                    {supervisors.map((sup) => (
                      <option key={sup.id} value={sup.id}>
                        {sup.name || sup.id}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <div className="form-col">
              <label className="form-label">
                แผนก
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">เลือกแผนก</option>
                  {departmentOptions.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-label">
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">เลือกสถานะ</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>

              <label className="form-label">
                Upload profile picture
                <div className="upload-box" role="button" tabIndex={0}>
                  <span className="upload-icon">⭡</span>
                </div>
              </label>
            </div>
          </div>

          <div className="create-user-actions">
            <button type="button" className="link-btn" onClick={handleReset}>
              ล้างแบบฟอร์ม
            </button>
            <div className="action-right">
              <button type="button" className="btn-light" onClick={handleCancel}>
                ยกเลิก
              </button>
              <button type="submit" className="btn-primary">
                บันทึก
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
