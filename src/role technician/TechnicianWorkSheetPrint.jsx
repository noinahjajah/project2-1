import './TechnicianDashboard.css';

const format = (label, value) => (
  <div className="tech-print-row" key={label}>
    <span className="tech-print-label">{label}</span>
    <span className="tech-print-value">{value || '-'}</span>
  </div>
);

export default function TechnicianWorkSheetPrint({ data = {} }) {
  const {
    workOrderId,
    version,
    openedAt,
    slaDueAt,
    type,
    priority,
    department,
    customerName,
    contactPerson,
    contactPhone,
    mapUrl,
    address,
    lat,
    long,
    title,
    requirementDetail,
    deviceOrSystem,
    specialCondition,
    mainTechnician,
    assistantTechnicians,
    checkInAt,
    checkOutAt,
    workLogBefore,
    workLogAction,
    workLogTest,
    usedParts,
    resultStatus,
    resultSummary,
    followUpTask,
    technicianNote,
    supervisorNote,
    customerSignName,
    customerSignDate,
    supervisorApproveStatus,
    supervisorApproveReason,
    supervisorApproveDate,
  } = data;

  return (
    <div className="tech-dashboard-page tech-print-page">
      <header className="tech-print-header">
        <div>
          <p className="tech-panel-title">ใบงานช่าง (Work Sheet)</p>
          <p className="tech-subtext">สำหรับพิมพ์/ส่ง PDF</p>
        </div>
        <div className="tech-print-meta">
          <span className="tech-status-badge">{workOrderId || 'WO-xxxx'}</span>
          <span className="tech-status-badge neutral">Version: {version || '-'}</span>
        </div>
      </header>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">ข้อมูลใบงาน</p>
        {format('Work Order ID', workOrderId)}
        {format('Version', version)}
        {format('เปิดใบงานเมื่อ', openedAt)}
        {format('SLA กำหนดส่ง', slaDueAt)}
        {format('ประเภทงาน', type)}
        {format('ความเร่งด่วน', priority)}
        {format('แผนก', department)}
      </section>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">ข้อมูลลูกค้า / สถานที่</p>
        {format('ลูกค้า', customerName)}
        {format('ผู้ติดต่อ', contactPerson)}
        {format('เบอร์โทร', contactPhone)}
        {format('Map URL', mapUrl)}
        {format('ที่อยู่', address)}
        {format('Lat', lat)}
        {format('Long', long)}
      </section>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">รายละเอียดคำร้อง / Requirement</p>
        {format('หัวข้อ', title)}
        {format('รายละเอียด', requirementDetail)}
        {format('อุปกรณ์/ระบบ', deviceOrSystem)}
        {format('เงื่อนไขพิเศษ', specialCondition)}
      </section>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">ข้อมูลช่างผู้ดำเนินการ</p>
        {format('ช่างหลัก', mainTechnician)}
        {format('ผู้ช่วยช่าง', assistantTechnicians)}
        {format('Check-in', checkInAt)}
        {format('Check-out', checkOutAt)}
      </section>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">บันทึกการดำเนินงาน</p>
        {format('สภาพก่อนดำเนินงาน', workLogBefore)}
        {format('ขั้นตอนดำเนินงาน', workLogAction)}
        {format('ผลการทดสอบ', workLogTest)}
        {format('อะไหล่/วัสดุที่ใช้', usedParts)}
      </section>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">ผลการดำเนินงาน</p>
        {format('สถานะผลลัพธ์', resultStatus)}
        {format('สรุปผล', resultSummary)}
        {format('งานติดตาม', followUpTask)}
      </section>

      <section className="tech-panel tech-print-section">
        <p className="tech-panel-title">หมายเหตุ / การอนุมัติ</p>
        {format('หมายเหตุช่าง', technicianNote)}
        {format('หมายเหตุหัวหน้า', supervisorNote)}
        {format('ชื่อลูกค้าที่เซ็น', customerSignName)}
        {format('วันที่ลูกค้าเซ็น', customerSignDate)}
        {format('สถานะอนุมัติหัวหน้า', supervisorApproveStatus)}
        {format('เหตุผลอนุมัติ/ตีกลับ', supervisorApproveReason)}
        {format('วันที่อนุมัติ/ตีกลับ', supervisorApproveDate)}
      </section>
    </div>
  );
}
