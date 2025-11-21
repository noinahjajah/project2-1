import './Dashboard.css';

const kpis = [
  { label: 'Total Work Orders', value: '123', delta: '+8% vs last week' },
  { label: 'New This Week', value: '12', delta: '+3 from avg' },
  { label: 'In Progress', value: '34', delta: '5 overdue' },
  { label: 'Completed', value: '87', delta: '+14 closed' },
  { label: 'Late', value: '5', delta: '2 critical' },
  { label: 'Returned / Rejected', value: '3', delta: '-1 vs last week' },
];

const tasks = [
  { id: 'WO-1023', customer: 'ACME Corp', due: 'วันนี้', priority: 'สูง', status: 'รอ assign' },
  { id: 'WO-1024', customer: 'Beta Ltd', due: 'วันนี้', priority: 'กลาง', status: 'ติดตาม' },
  { id: 'WO-1018', customer: 'Delta Co', due: 'ค้างส่งมอบ', priority: 'สูง', status: 'ค้างส่งมอบ' },
];

const recent = [
  { id: 'WO-1044', customer: 'ACME', tech: 'Somchai, Nui', priority: 'สูง', status: 'กำลังทำ', updated: '10:45' },
  { id: 'WO-1043', customer: 'Beta', tech: 'Fern', priority: 'กลาง', status: 'ใหม่', updated: '10:20' },
  { id: 'WO-1042', customer: 'Delta', tech: 'Team A', priority: 'ต่ำ', status: 'เสร็จสิ้น', updated: '09:50' },
];

const filters = ['แผนก', 'ลูกค้า', 'Work Type', 'สถานะ', 'ช่วงเวลา'];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="filter-bar">
        <div className="filter-group">
          {filters.map((f) => (
            <button key={f} className="filter-chip">
              {f} ▼
            </button>
          ))}
        </div>
        <div className="filter-range">
          <button className="filter-pill active">Week</button>
          <button className="filter-pill">Month</button>
          <button className="filter-pill">Year</button>
        </div>
      </section>

      <section className="kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="kpi-card">
            <p className="kpi-label">{kpi.label}</p>
            <div className="kpi-value-row">
              <p className="kpi-value">{kpi.value}</p>
              <span className="kpi-delta">{kpi.delta}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="charts-row">
        <article className="chart-card">
          <div className="chart-header">
            <p className="chart-title">Status Split</p>
          </div>
          <div className="chart-placeholder">Pie Chart (New / In Progress / Completed / Late / Returned)</div>
        </article>
        <article className="chart-card">
          <div className="chart-header">
            <p className="chart-title">Work by Department / Customer</p>
            <div className="chart-toggle">
              <button className="filter-pill active">Weekly</button>
              <button className="filter-pill">Monthly</button>
            </div>
          </div>
          <div className="chart-placeholder tall">Bar Chart (Dept / Customer)</div>
        </article>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="panel-header">
            <p className="panel-title">Today’s Tasks / Action Items</p>
          </div>
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-row">
                <div className="task-meta">
                  <p className="task-id">{task.id}</p>
                  <p className="task-customer">{task.customer}</p>
                </div>
                <div className="task-info">
                  <span className="badge">{task.status}</span>
                  <span className="badge neutral">กำหนดส่ง: {task.due}</span>
                  <span className={`badge ${task.priority === 'สูง' ? 'danger' : ''}`}>
                    Priority: {task.priority}
                  </span>
                </div>
                <button className="assign-btn">Assign to Technician</button>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <p className="panel-title">Recent Work Orders</p>
          </div>
          <div className="recent-list">
            {recent.map((item) => (
              <div key={item.id} className="recent-row">
                <div className="recent-main">
                  <p className="task-id">{item.id}</p>
                  <p className="task-customer">{item.customer}</p>
                  <p className="recent-tech">Tech: {item.tech}</p>
                </div>
                <div className="recent-meta">
                  <span className="badge neutral">Priority: {item.priority}</span>
                  <span className="badge">{item.status}</span>
                  <span className="timestamp">{item.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="bottom-row">
        <article className="panel shortcuts">
          <p className="panel-title">Shortcuts</p>
          <div className="shortcut-grid">
            <button className="shortcut-btn">เปิดใบงานใหม่</button>
            <button className="shortcut-btn">จัดการสมาชิก</button>
            <button className="shortcut-btn">ตั้งค่าระบบ</button>
            <button className="shortcut-btn">ออกรายงาน (PDF)</button>
          </div>
        </article>

        <article className="panel notes">
          <p className="panel-title">Notes / System Messages</p>
          <ul className="notes-list">
            <li>Alert: 3 jobs overdue today.</li>
            <li>ประกาศ: ระบบจะปิดปรับปรุง 22:00-23:00</li>
            <li>Note: ACME ขอเลื่อนนัดเป็นพรุ่งนี้</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
