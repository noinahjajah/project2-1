import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import './JobDetail.css';

const formatMapLink = (location) => {
  if (!location) return null;
  const [lat, lng] = location.split(',').map((v) => v.trim());
  if (!lat || !lng) return null;
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

const formatEmbedMapUrl = (location) => {
  if (!location) return null;
  const [lat, lng] = location.split(',').map((v) => v.trim());
  if (!lat || !lng) return null;
  return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
};

const formatDateTime = (value) => {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleString('th-TH');
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();

  const decodedId = decodeURIComponent(id);
  const job = useMemo(() => jobs.find((j) => j.id === decodedId), [jobs, decodedId]);

  if (!job) {
    return (
      <div className="job-detail-page">
        <p>ไม่พบใบงาน</p>
        <button className="btn-primary" onClick={() => navigate(-1)}>ย้อนกลับ</button>
      </div>
    );
  }

  const mapLink = formatMapLink(job.location);
  const embedMapUrl = formatEmbedMapUrl(job.location);

  return (
    <div className="job-detail-page">
      <button className="job-detail-back" type="button" onClick={() => navigate('/admin/joblist')}>
        ← Back to Joblist
      </button>

      <div className="job-detail-hero">
        <div>
          <p className="job-detail-eyebrow">Work Order</p>
          <h1 className="job-detail-main-title">{job.title}</h1>
          {/* <p className="job-detail-subtext">{job.desc}</p> */}
        </div>
        {/* <div className="job-detail-tags"> */}
          {/* <span className="pill">ID: {job.id}</span>
          <span className="pill neutral">Version: {job.version || '-'}</span>
          <span className="pill neutral">Status: {job.status}</span>
          <span className="pill">{job.type}</span>
          {job.badge && <span className="pill accent">{job.badge}</span>}
          <span className="pill">Priority: {job.priority || '-'}</span>
          <span className="pill">Due: {formatDateTime(job.dueDate)}</span> */}
        {/* </div> */}
      </div>

      <div className="job-detail-grid">
        <section className="job-detail-card">
          <div className="job-detail-section">
            <p className="job-detail-title">ข้อมูลใบงาน</p>
            <div className="field-grid two-col">
              <div className="field">
                <p className="field-label">เลขที่ใบงาน</p>
                <p className="field-value">{job.id}</p>
              </div>
              <div className="field">
                <p className="field-label">เวอร์ชัน</p>
                <p className="field-value">{job.version || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">วันที่เปิดใบงาน</p>
                <p className="field-value">{formatDateTime(job.openedAt)}</p>
              </div>
              <div className="field">
                <p className="field-label">ประเภทงาน</p>
                <p className="field-value">{job.type || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">ความเร่งด่วน</p>
                <p className="field-value">{job.priority || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">กำหนดแล้วเสร็จ</p>
                <p className="field-value">{formatDateTime(job.dueDate)}</p>
              </div>
              <div className="field full">
                <p className="field-label">หน่วยงานที่รับผิดชอบ</p>
                <p className="field-value">{job.department || '-'}</p>
              </div>
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title">ข้อมูลลูกค้า / สถานที่ปฏิบัติงาน</p>
            <div className="field-grid two-col">
              <div className="field">
                <p className="field-label">ชื่อลูกค้า / บริษัท</p>
                <p className="field-value">{job.customer || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">ผู้ติดต่อหน้างาน</p>
                <p className="field-value">{job.contactPerson || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">เบอร์โทรศัพท์</p>
                <p className="field-value">{job.contactPhone || '-'}</p>
              </div>
              <div className="field full">
                <p className="field-label">ที่อยู่หน้างาน</p>
                <p className="field-value">{job.address || '-'}</p>
              </div>
              
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title"> รายละเอียดคำร้อง</p>
            <div className="field">
              <p className="field-label">ชื่องาน</p>
              <p className="field-value">{job.title || '-'}</p>
            </div>
            <div className="field">
              <p className="field-label">รายละเอียดคำร้อง</p>
              <p className="field-value">{job.requirementDetail || '-'}</p>
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title">ข้อมูลช่างผู้ดำเนินการ</p>
            <div className="field-grid two-col">
              <div className="field">
                <p className="field-label">ช่างผู้รับผิดชอบหลัก</p>
                <p className="field-value">{job.mainTechnician || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">เวลาเช็คอินหน้างาน</p>
                <p className="field-value">{formatDateTime(job.checkInAt)}</p>
              </div>
              <div className="field">
                <p className="field-label">เวลาเช็คเอาต์หน้างาน</p>
                <p className="field-value">{formatDateTime(job.checkOutAt)}</p>
              </div>
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title">บันทึกการดำเนินงานของช่าง (Work Log)</p>
            <div className="field">
              <p className="field-label">ขั้นตอนการตรวจสอบ / สภาพก่อนดำเนินการ</p>
              <p className="field-value">{job.workLogBefore || '-'}</p>
            </div>
            <div className="field">
              <p className="field-label">ขั้นตอนการแก้ไข / ปรับปรุง / ติดตั้ง</p>
              <p className="field-value">{job.workLogAction || '-'}</p>
            </div>
            <div className="field">
              <p className="field-label">การทดสอบหลังดำเนินการ</p>
              <p className="field-value">{job.workLogTest || '-'}</p>
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title">ผลการดำเนินงาน (Result)</p>
            <div className="field-grid two-col">
              <div className="field">
                <p className="field-label">สถานะงาน</p>
                <p className="field-value">{job.resultStatus || '-'}</p>
              </div>
              <div className="field full">
                <p className="field-label">สรุปผลการดำเนินงาน</p>
                <p className="field-value">{job.resultSummary || '-'}</p>
              </div>
              <div className="field full">
                <p className="field-label">งานที่ต้องติดตามต่อ</p>
                <p className="field-value">{job.followUpTask || '-'}</p>
              </div>
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title">ความเห็นเพิ่มเติม / หมายเหตุ</p>
            <div className="field">
              <p className="field-label">หมายเหตุของช่าง</p>
              <p className="field-value">{job.technicianNote || '-'}</p>
            </div>
            <div className="field">
              <p className="field-label">หมายเหตุของหัวหน้างาน</p>
              <p className="field-value">{job.supervisorNote || '-'}</p>
            </div>
          </div>

          <div className="job-detail-section">
            <p className="job-detail-title">การอนุมัติ / การปิดงาน</p>
            <div className="field-grid two-col">
              <div className="field">
                <p className="field-label">ชื่อลูกค้าที่ตรวจรับ</p>
                <p className="field-value">{job.customerSignName || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">ตำแหน่ง</p>
                <p className="field-value">{job.customerSignTitle || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">วันที่ลูกค้าตรวจรับ</p>
                <p className="field-value">{job.customerSignDate || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">ลายเซ็นลูกค้า</p>
                <p className="field-value">{job.customerSignName ? 'Signed' : '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">หัวหน้าช่าง / Supervisor</p>
                <p className="field-value">{job.supervisorCloseName || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">วันที่ปิดงาน</p>
                <p className="field-value">{job.supervisorCloseDate || '-'}</p>
              </div>
              <div className="field">
                <p className="field-label">สถานะปิดงาน</p>
                <p className="field-value">{job.supervisorCloseStatus || '-'}</p>
              </div>
              <div className="field full">
                <p className="field-label">เหตุผลหากตีกลับ</p>
                <p className="field-value">{job.supervisorCloseReason || '-'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="job-detail-card">
          <div className="job-detail-map-header">
            <p className="job-detail-title">Location</p>
          </div>
          <div className="job-detail-map-box">
            {embedMapUrl ? (
              <iframe
                title="Map location"
                src={embedMapUrl}
                className="job-detail-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="map-placeholder">
                <p>ไม่มีข้อมูลพิกัด</p>
              </div>
            )}

            <p className="value" style={{ marginTop: 8 }}>
              {job.locationAddress || 'No address'}
            </p>

            {mapLink && (
              <small className="job-detail-location">
                พิกัด: {job.location}
              </small>
            )}
          </div>
          <button className="checkin-btn" onClick={() => mapLink && window.open(mapLink, '_blank')}>
            Check in
          </button>
        </section>
      </div>
    </div>
  );
}
