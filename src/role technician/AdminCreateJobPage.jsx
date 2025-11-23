import { useEffect, useMemo, useState } from 'react';
import './TechnicianDashboard.css';
import './CreateJobPage.css';

const defaultForm = {
  mainTechnician: '',
  assistantTechnician: '',
  supervisor: '',
  priority: 'MEDIUM',
  startDate: '',
  dueDate: '',
  customerName: '',
  contactPerson: '',
  contactPhone: '',
  address: '',
  location: '',
  requirement: '',
  attachmentsNote: '',
  status: 'Draft',
};

export default function AdminCreateJobPage({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultForm);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({ ...defaultForm, ...initialData });
    }
  }, [initialData]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const requiredFields = useMemo(
    () => ['mainTechnician', 'supervisor', 'priority', 'startDate', 'dueDate', 'customerName', 'contactPhone'],
    []
  );

  const isPhoneValid = (phone) => {
    if (!phone) return false;
    return /^\d{9,10}$/.test(phone.trim());
  };

  const isDueDateValid = (start, due) => {
    if (!start || !due) return true;
    return new Date(due) >= new Date(start);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const validate = () => {
    const nextErrors = {};
    requiredFields.forEach((field) => {
      if (!form[field]) nextErrors[field] = 'จำเป็น';
    });
    if (!isPhoneValid(form.contactPhone)) {
      nextErrors.contactPhone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';
    }
    if (!isDueDateValid(form.startDate, form.dueDate)) {
      nextErrors.dueDate = 'กำหนดส่งต้องเป็นวันเดียวกันหรือหลังวันเริ่มต้น';
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      alert(nextErrors.contactPhone || 'กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
      return;
    }
    const payload = { ...form, status: 'ส่งให้ช่างแล้ว' };
    setForm(payload);
    onSubmit?.(payload);
    setToast('บันทึกใบงานเรียบร้อยแล้ว');
  };

  const handleSaveDraft = () => {
    const phoneErrors = {};
    if (form.contactPhone && !isPhoneValid(form.contactPhone)) {
      phoneErrors.contactPhone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';
      setErrors((prev) => ({ ...prev, ...phoneErrors }));
      alert(phoneErrors.contactPhone);
      return;
    }
    if (form.startDate && form.dueDate && !isDueDateValid(form.startDate, form.dueDate)) {
      const dateError = { dueDate: 'กำหนดส่งต้องเป็นวันเดียวกันหรือหลังวันเริ่มต้น' };
      setErrors((prev) => ({ ...prev, ...dateError }));
      alert(dateError.dueDate);
      return;
    }
    const payload = { ...form, status: 'Draft' };
    setForm(payload);
    onSubmit?.(payload);
    setToast('บันทึกใบงานเรียบร้อยแล้ว');
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirmExit = window.confirm(
        'คุณยังไม่ได้บันทึกการเปลี่ยนแปลง ต้องการออกจากหน้านี้หรือไม่?'
      );
      if (!confirmExit) return;
    }
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="tech-dashboard-page tech-form-page createjob-page">
      <header className="tech-form-header createjob-header">
        <div>
          <h3>Maintenance Agreement (MA)</h3>
          {/* <p className="tech-subtext">สร้างใบงานซ่อมบำรุงสำหรับส่งให้ช่าง</p> */}
        </div>
      </header>

      <form className="tech-form-grid" onSubmit={handleSubmit}>
        <section className="tech-two-column createjob-two-column">
          <section className="tech-panel tech-form-section createjob-panel">
            <p className="tech-panel-title section-title">ส่วนที่ 1 : ข้อมูลใบงาน</p>
            <div className="tech-form-row">
              <label className="tech-form-label createjob-label">
                ช่างผู้รับผิดชอบหลัก
                <select
                  name="mainTechnician"
                  value={form.mainTechnician}
                  onChange={handleChange}
                  className="tech-input createjob-select"
                >
                  <option value="">-- เลือก --</option>
                  <option value="tech_a">ช่าง A</option>
                  <option value="tech_b">ช่าง B</option>
                  <option value="tech_c">ช่าง C</option>
                </select>
                {errors.mainTechnician && <span className="tech-error">{errors.mainTechnician}</span>}
              </label>
              <label className="tech-form-label createjob-label">
                ช่างผู้ช่วย (ถ้ามี)
                <select
                  name="assistantTechnician"
                  value={form.assistantTechnician}
                  onChange={handleChange}
                  className="tech-input createjob-select"
                >
                  <option value="">-- เลือก --</option>
                  <option value="assistant_a">ผู้ช่วย A</option>
                  <option value="assistant_b">ผู้ช่วย B</option>
                  <option value="assistant_c">ผู้ช่วย C</option>
                </select>
              </label>
              <label className="tech-form-label createjob-label">
                หัวหน้างาน
                <select name="supervisor" value={form.supervisor} onChange={handleChange} className="tech-input createjob-select">
                  <option value="">-- เลือก --</option>
                  <option value="supervisor_a">หัวหน้า A</option>
                  <option value="supervisor_b">หัวหน้า B</option>
                  <option value="supervisor_c">หัวหน้า C</option>
                </select>
                {errors.supervisor && <span className="tech-error">{errors.supervisor}</span>}
              </label>
            </div>

            <div className="tech-form-row">
              <div className="tech-priority-block createjob-field">
                <p className="tech-form-label createjob-label">ความเร่งด่วน (Priority)</p>
                <div className="tech-priority-options vertical">
                  {[
                    { value: 'HIGH', label: 'สูง (Critical)', color: 'danger' },
                    { value: 'MEDIUM', label: 'กลาง (Normal)', color: 'info' },
                    { value: 'LOW', label: 'ต่ำ (Low)', color: 'success' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`tech-priority-chip vertical ${opt.color} ${form.priority === opt.value ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={opt.value}
                        checked={form.priority === opt.value}
                        onChange={handleChange}
                      />
                      <span className="priority-check">{form.priority === opt.value ? '✓' : ''}</span>
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.priority && <span className="tech-error">{errors.priority}</span>}
              </div>
            </div>

            <div className="tech-form-row">
              <label className="tech-form-label createjob-label">
                Start Date
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="tech-input createjob-input"
                />
                {errors.startDate && <span className="tech-error">{errors.startDate}</span>}
              </label>
              <label className="tech-form-label createjob-label">
                Due Date / SLA
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="tech-input createjob-input"
                />
                {errors.dueDate && <span className="tech-error">{errors.dueDate}</span>}
              </label>
            </div>

            
          </section>

          <section className="tech-panel tech-form-section createjob-panel">
            <p className="tech-panel-title section-title">ส่วนที่ 2 : ข้อมูลลูกค้า / สถานที่ปฏิบัติงาน</p>
            <div className="tech-form-row">
              <label className="tech-form-label createjob-label">
                ชื่อลูกค้า / บริษัท
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="tech-input createjob-input"
                />
                {errors.customerName && <span className="tech-error">{errors.customerName}</span>}
              </label>
              <label className="tech-form-label createjob-label">
                ผู้ติดต่อหน้างาน
                <input
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  className="tech-input createjob-input"
                />
              </label>
              <label className="tech-form-label createjob-label">
                เบอร์โทรศัพท์
                <input
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  className="tech-input createjob-input"
                />
                {errors.contactPhone && <span className="tech-error">{errors.contactPhone}</span>}
              </label>
              <label className="tech-form-label createjob-label wide">
                ที่อยู่หน้างาน
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="tech-textarea createjob-textarea"
                  rows={2}
                />
              </label>
            </div>

            <div className="tech-form-row">
              <label className="tech-form-label createjob-label wide">
                Location
                <div className="tech-map-box createjob-map-box">
                  <p className="tech-subtext">Map preview placeholder</p>
                </div>
              </label>
              <label className="tech-form-label createjob-label wide">
                Requirement
                <textarea
                  name="requirement"
                  value={form.requirement}
                  onChange={handleChange}
                  className="tech-textarea createjob-textarea"
                  rows={3}
                />
              </label>
              <label className="tech-form-label createjob-label wide">
                Upload Document
                <div className="tech-upload-box createjob-upload-box">
                  <div className="upload-icon">⬆</div>
                  <p className="tech-subtext">Drag and drop document to upload your support work</p>
                  <div className="tech-upload-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, attachmentsNote: 'เลือกไฟล์แล้ว' }));
                        setIsDirty(true);
                      }}
                    >
                      Browse files
                    </button>
                    {form.attachmentsNote && <span className="tech-subtext">{form.attachmentsNote}</span>}
                  </div>
                </div>
              </label>
            </div>
          </section>
        </section>

        <div className="tech-form-footer createjob-footer">
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            ยกเลิก
          </button>
          <button type="button" className="btn-secondary" onClick={handleSaveDraft}>
            บันทึกเป็นฉบับร่าง
          </button>
          <button type="submit" className="btn-primary">
            บันทึกและส่งให้ช่าง
          </button>
        </div>
      </form>
      {toast && (
        <div className="tech-toast">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
