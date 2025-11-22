import './TechnicianDashboard.css';

const filters = ['สถานะงานของฉัน', 'ประเภทงาน', 'ความเร่งด่วน', 'ช่วงเวลา'];

const kpis = [
  { label: 'งานทั้งหมดของฉัน (เดือนนี้)', value: '26', delta: '+3 จากเดือนก่อน' },
  { label: 'งานวันนี้', value: '4', delta: '2 งานนัดหมายภาคสนาม' },
  { label: 'กำลังดำเนินการ', value: '7', delta: '1 งานใกล้ครบกำหนด' },
  { label: 'งานเสร็จแล้ว (เดือนนี้)', value: '18', delta: 'ส่งงานตรงเวลา 95%' },
  { label: 'งานที่ถูกตีกลับ', value: '2', delta: 'เหลือ 1 งานต้องแก้ไข' },
  { label: 'งานล่าช้าของฉัน', value: '1', delta: 'ติดตามวันนี้' },
];

const tasks = [
  { id: 'WO-1050', customer: 'ACME Corp', due: 'วันนี้ 14:00', priority: 'สูง', status: 'กำลังทำ' },
  { id: 'WO-1060', customer: 'Beta Ltd', due: 'พรุ่งนี้', priority: 'กลาง', status: 'รอส่งหัวหน้า' },
  { id: 'WO-1048', customer: 'Delta Co', due: 'เกินกำหนด 1 วัน', priority: 'สูง', status: 'ค้างส่งมอบ' },
  { id: 'WO-1039', customer: 'Evergreen', due: 'สัปดาห์นี้', priority: 'ต่ำ', status: 'รอเริ่ม' },
  { id: 'WO-1020', customer: 'GreenTech', due: 'ปิดงานแล้ว', priority: 'ต่ำ', status: 'เสร็จแล้ว' },
  { id: 'WO-1012', customer: 'Omega Co', due: 'ถูกยกเลิก', priority: 'ต่ำ', status: 'ยกเลิก' },
];

const statusClass = (status) => {
  if (status === 'เสร็จแล้ว') return 'success';
  if (status === 'รอส่งหัวหน้า' || status === 'รอส่ง') return 'warn';
  if (status === 'ยกเลิก') return 'cancel';
  if (status === 'ค้างส่งมอบ' || status === 'กำลังทำ') return 'danger';
  if (status === 'รอเริ่ม') return 'neutral';
  return 'neutral';
};

const recent = [
  {
    id: 'WO-1048',
    customer: 'Delta Co',
    note: 'หัวหน้าตีกลับ: ขอรูปก่อน-หลังหน้างาน',
    status: 'ต้องแก้ไขเพิ่มเติม',
    updated: '10:45',
    urgency: 'สูง',
  },
  {
    id: 'WO-1035',
    customer: 'Beta Ltd',
    note: 'รออะไหล่ที่สั่งใหม่ ทดสอบไม่ผ่าน',
    status: 'รอดำเนินการต่อ',
    updated: '09:30',
    urgency: 'กลาง',
  },
  {
    id: 'WO-1029',
    customer: 'ACME Corp',
    note: 'ปรับเทียบอุปกรณ์ใหม่แล้ว รอรีวิว',
    status: 'ส่งกลับตรวจซ้ำ',
    updated: 'เมื่อวาน 16:20',
    urgency: 'กลาง',
  },
];

export default function TechnicianDashboard() {
  return (
    <div className="tech-dashboard-page">
      <section className="tech-filter-bar">
        <div className="tech-filter-group">
          {filters.map((f) => (
            <button key={f} className="tech-filter-chip">
              {f} ▼
            </button>
          ))}
        </div>
        <div className="tech-filter-range">
          <button className="tech-filter-pill active">สัปดาห์</button>
          <button className="tech-filter-pill">เดือน</button>
          <button className="tech-filter-pill">ปี</button>
        </div>
      </section>

      <section className="tech-kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="tech-kpi-card">
            <p className="tech-kpi-label">{kpi.label}</p>
            <div className="tech-kpi-value-row">
              <p className="tech-kpi-value">{kpi.value}</p>
              <span className="tech-kpi-delta">{kpi.delta}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="tech-charts-row">
        <article className="tech-chart-card">
          <div className="tech-chart-header">
            <p className="tech-chart-title">สถานะงานของฉัน</p>
          </div>
          <div className="tech-chart-placeholder">
            Pie Chart – งานใหม่ / กำลังทำ / รอส่งหัวหน้า / เสร็จแล้ว / ถูกตีกลับ ของช่างคนนี้
          </div>
        </article>
        <article className="tech-chart-card">
          <div className="tech-chart-header">
            <p className="tech-chart-title">ผลงานตามช่วงเวลา</p>
            <div className="chart-toggle">
              <button className="tech-filter-pill active">สัปดาห์</button>
              <button className="tech-filter-pill">เดือน</button>
            </div>
          </div>
          <div className="tech-chart-placeholder tall">Bar Chart – จำนวนงานของฉันในแต่ละสัปดาห์/เดือน</div>
        </article>
      </section>

      <section className="tech-two-column">
        <article className="tech-panel">
          <div className="tech-panel-header">
            <p className="tech-panel-title">งานวันนี้และงานค้างของฉัน</p>
          </div>
          <div className="tech-task-list">
            {tasks.map((task) => (
              <div key={task.id} className="tech-task-item">
                <div className="tech-task-meta">
                  <p className="tech-task-id">{task.id}</p>
                  <p className="tech-task-customer">{task.customer}</p>
                </div>
                <div className="tech-task-info">
                  <span className={`tech-status-badge ${statusClass(task.status)}`}>{task.status}</span>
                  <span className="tech-status-badge neutral">กำหนดส่ง: {task.due}</span>
                  <span className={`tech-status-badge ${task.priority === 'สูง' ? 'danger' : 'neutral'}`}>
                    ความเร่งด่วน: {task.priority}
                  </span>
                </div>
                <button className="tech-action-btn">ดูรายละเอียดงาน</button>
              </div>
            ))}
          </div>
        </article>

        <article className="tech-panel">
          <div className="tech-panel-header">
            <p className="tech-panel-title">งานที่ถูกตีกลับ / ต้องแก้ไข</p>
          </div>
          <div className="tech-reject-list">
            {recent.map((item) => (
              <div key={item.id} className="tech-reject-item">
                <div className="tech-reject-main">
                  <p className="tech-task-id">{item.id}</p>
                  <p className="tech-task-customer">{item.customer}</p>
                  <p className="tech-reject-note">หมายเหตุ: {item.note}</p>
                </div>
                <div className="tech-reject-meta">
                  <span className={`tech-status-badge ${statusClass(item.status)}`}>สถานะ: {item.status}</span>
                  <span className={`tech-status-badge ${item.urgency === 'สูง' ? 'danger' : 'neutral'}`}>
                    ความเร่งด่วน: {item.urgency}
                  </span>
                  <span className="tech-timestamp">{item.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="tech-bottom-row">
        <article className="tech-achievement-card">
          <p className="tech-panel-title">ความภาคภูมิใจของช่าง / สรุปผลงาน</p>
          <div className="tech-achievement-grid">
            <div className="tech-achievement-tile">
              <p className="tech-kpi-label">งานเสร็จสิ้นเดือนนี้</p>
              <p className="tech-kpi-value">18 งาน</p>
              <p className="tech-kpi-delta">ตรงเวลา 95% | ดีเลย์ 1 งาน</p>
            </div>
            <div className="tech-achievement-tile">
              <p className="tech-kpi-label">คะแนนความพึงพอใจลูกค้า</p>
              <p className="tech-kpi-value">4.7 / 5</p>
              <p className="tech-kpi-delta">เก็บรีวิวเพิ่มอีก 2 งาน</p>
            </div>
            <div className="tech-achievement-tile">
              <p className="tech-kpi-label">Badge: 10 งานแรกของเดือนนี้</p>
              <span className="tech-status-badge">ปลดล็อกแล้ว</span>
              <p className="tech-kpi-delta">ทำต่ออีก 5 งานเพื่อรับโบนัส</p>
            </div>
            <div className="tech-achievement-tile">
              <p className="tech-kpi-label">แผนพัฒนาฝีมือ</p>
              <p className="tech-kpi-delta">เรียนคอร์ส Fiber Splicing เสร็จ 60%</p>
            </div>
          </div>
        </article>

        <article className="tech-calendar-card">
          <p className="tech-panel-title">ปฏิทินงาน (ย่อ)</p>
          <ul className="tech-calendar-list">
            <li>พรุ่งนี้ – WO-1050 ติดตั้งระบบที่ ACME (09:00)</li>
            <li>ศุกร์นี้ – WO-1060 ตรวจเช็ค MA ที่ Beta Ltd</li>
            <li>จันทร์หน้า – WO-1072 สำรวจหน้างานใหม่ที่ GreenTech</li>
            <li>ปฏิทินจริงจะซิงก์กับ Google Calendar / Mobile App</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
