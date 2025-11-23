import { useEffect, useState } from 'react';
import './TechnicianDashboard.css';

const defaultForm = {
  workOrderId: '',
  version: 'v1',
  openedAt: '',
  slaDueAt: '',
  type: 'MA',
  priority: 'HIGH',
  department: '',
  customerName: '',
  contactPerson: '',
  contactPhone: '',
  mapUrl: '',
  address: '',
  lat: '',
  long: '',
  title: '',
  requirementDetail: '',
  deviceOrSystem: '',
  specialCondition: '',
  mainTechnician: '',
  assistantTechnicians: '',
  checkInAt: '',
  checkOutAt: '',
  workLogBefore: '',
  workLogAction: '',
  workLogTest: '',
  usedParts: '',
  resultStatus: 'SUCCESS',
  resultSummary: '',
  followUpTask: '',
  technicianNote: '',
  supervisorNote: '',
  customerSignName: '',
  customerSignDate: '',
  supervisorApproveStatus: 'APPROVED',
  supervisorApproveReason: '',
  supervisorApproveDate: '',
};

export default function TechnicianWorkSheetForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setForm({ ...defaultForm, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    console.log('Work sheet data:', form);
  };

  return (
    <div className="tech-dashboard-page tech-form-page">
      <header className="tech-form-header">
        <div>
          <p className="tech-panel-title">ใบงานช่าง (Work Sheet)</p>
          <p className="tech-subtext">กรอก/แก้ไขข้อมูลใบงานเพื่อบันทึกการทำงานของช่าง</p>
        </div>
        <button type="submit" form="tech-work-sheet-form" className="tech-action-btn">
          บันทึกใบงาน
        </button>
      </header>

      <form id="tech-work-sheet-form" onSubmit={handleSubmit} className="tech-form-grid">
        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">ข้อมูลใบงาน</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label">
              Work Order ID
              <input name="workOrderId" value={form.workOrderId} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              Version
              <select name="version" value={form.version} onChange={handleChange} className="tech-input">
                <option value="v1">v1</option>
                <option value="v2">v2</option>
                <option value="v3">v3</option>
                <option value="other">other</option>
              </select>
            </label>
            <label className="tech-form-label">
              เปิดใบงานเมื่อ
              <input type="datetime-local" name="openedAt" value={form.openedAt} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              SLA กำหนดส่ง
              <input type="datetime-local" name="slaDueAt" value={form.slaDueAt} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              ประเภทงาน
              <select name="type" value={form.type} onChange={handleChange} className="tech-input">
                <option value="MA">MA</option>
                <option value="PERCALL">PERCALL</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </label>
            <label className="tech-form-label">
              ความเร่งด่วน
              <select name="priority" value={form.priority} onChange={handleChange} className="tech-input">
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </label>
            <label className="tech-form-label">
              แผนก
              <input name="department" value={form.department} onChange={handleChange} className="tech-input" />
            </label>
          </div>
        </section>

        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">ข้อมูลลูกค้า / สถานที่ปฏิบัติงาน</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label">
              ลูกค้า
              <input name="customerName" value={form.customerName} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              ผู้ติดต่อ
              <input name="contactPerson" value={form.contactPerson} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              เบอร์โทร
              <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              Map URL
              <input name="mapUrl" value={form.mapUrl} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label wide">
              ที่อยู่
              <textarea name="address" value={form.address} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
            <label className="tech-form-label">
              Lat
              <input name="lat" value={form.lat} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              Long
              <input name="long" value={form.long} onChange={handleChange} className="tech-input" />
            </label>
          </div>
        </section>

        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">รายละเอียดคำร้อง / Requirement งาน</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label">
              หัวข้อ
              <input name="title" value={form.title} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label wide">
              รายละเอียดคำร้อง
              <textarea name="requirementDetail" value={form.requirementDetail} onChange={handleChange} className="tech-textarea" rows={3} />
            </label>
            <label className="tech-form-label">
              อุปกรณ์/ระบบที่เกี่ยวข้อง
              <input name="deviceOrSystem" value={form.deviceOrSystem} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              เงื่อนไขพิเศษ
              <input name="specialCondition" value={form.specialCondition} onChange={handleChange} className="tech-input" />
            </label>
          </div>
        </section>

        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">ข้อมูลช่างผู้ดำเนินการ</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label">
              ช่างหลัก
              <input name="mainTechnician" value={form.mainTechnician} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              ผู้ช่วยช่าง (คั่นด้วย ,)
              <input
                name="assistantTechnicians"
                value={form.assistantTechnicians}
                onChange={handleChange}
                className="tech-input"
              />
            </label>
            <label className="tech-form-label">
              Check-in
              <input type="datetime-local" name="checkInAt" value={form.checkInAt} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              Check-out
              <input
                type="datetime-local"
                name="checkOutAt"
                value={form.checkOutAt}
                onChange={handleChange}
                className="tech-input"
              />
            </label>
          </div>
        </section>

        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">บันทึกการดำเนินงานของช่าง</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label wide">
              สภาพก่อนดำเนินงาน
              <textarea name="workLogBefore" value={form.workLogBefore} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
            <label className="tech-form-label wide">
              ขั้นตอนดำเนินงาน
              <textarea name="workLogAction" value={form.workLogAction} onChange={handleChange} className="tech-textarea" rows={3} />
            </label>
            <label className="tech-form-label wide">
              ผลการทดสอบ
              <textarea name="workLogTest" value={form.workLogTest} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
            <label className="tech-form-label wide">
              อะไหล่/วัสดุที่ใช้
              <textarea name="usedParts" value={form.usedParts} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
          </div>
        </section>

        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">ผลการดำเนินงาน</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label">
              สถานะผลลัพธ์
              <select name="resultStatus" value={form.resultStatus} onChange={handleChange} className="tech-input">
                <option value="SUCCESS">SUCCESS</option>
                <option value="PARTIAL">PARTIAL</option>
                <option value="FAILED">FAILED</option>
              </select>
            </label>
            <label className="tech-form-label wide">
              สรุปผล
              <textarea name="resultSummary" value={form.resultSummary} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
            <label className="tech-form-label wide">
              งานติดตาม/สิ่งที่ต้องทำต่อ
              <textarea name="followUpTask" value={form.followUpTask} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
          </div>
        </section>

        <section className="tech-panel tech-form-section">
          <div className="tech-panel-header">
            <p className="tech-panel-title">หมายเหตุ / การอนุมัติ</p>
          </div>
          <div className="tech-form-row">
            <label className="tech-form-label wide">
              หมายเหตุช่าง
              <textarea name="technicianNote" value={form.technicianNote} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
            <label className="tech-form-label wide">
              หมายเหตุหัวหน้า
              <textarea name="supervisorNote" value={form.supervisorNote} onChange={handleChange} className="tech-textarea" rows={2} />
            </label>
            <label className="tech-form-label">
              ชื่อลูกค้าที่เซ็น
              <input name="customerSignName" value={form.customerSignName} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              วันที่ลูกค้าเซ็น
              <input type="date" name="customerSignDate" value={form.customerSignDate} onChange={handleChange} className="tech-input" />
            </label>
            <label className="tech-form-label">
              สถานะอนุมัติหัวหน้า
              <select
                name="supervisorApproveStatus"
                value={form.supervisorApproveStatus}
                onChange={handleChange}
                className="tech-input"
              >
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </label>
            <label className="tech-form-label">
              เหตุผลอนุมัติ/ตีกลับ
              <input
                name="supervisorApproveReason"
                value={form.supervisorApproveReason}
                onChange={handleChange}
                className="tech-input"
              />
            </label>
            <label className="tech-form-label">
              วันที่อนุมัติ/ตีกลับ
              <input type="date" name="supervisorApproveDate" value={form.supervisorApproveDate} onChange={handleChange} className="tech-input" />
            </label>
          </div>
        </section>

        <footer className="tech-form-footer">
          <button type="submit" className="tech-action-btn">บันทึกใบงาน</button>
          <button type="button" className="tech-filter-pill" onClick={() => setForm(defaultForm)}>
            เคลียร์ฟอร์ม
          </button>
        </footer>
      </form>
    </div>
  );
}
