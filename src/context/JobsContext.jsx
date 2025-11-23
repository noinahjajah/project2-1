import { createContext, useContext, useMemo, useState } from 'react';

const JobsContext = createContext(null);

const initialJobs = [
  {
    id: 'WO-2025-0001',
    title: 'เปลี่ยนคอมเพรสเซอร์แอร์ห้องประชุม',
    desc: 'สำนักงานใหญ่ - On-site',
    badge: 'Urgent',
    status: 'new',
    customer: 'บริษัท A',
    type: 'MA',
    department: 'IT Support',
    dueDate: '2025-11-24T16:00:00',
    location: '13.855857, 100.585652',
    technicians: [
      { id: 'tech01', name: 'ช่างเอก' },
      { id: 'tech02', name: 'ช่างบอย' },
    ],
  },
  {
    id: 'WO-2025-0002',
    title: 'ตรวจเช็คระบบไฟฟ้าชั้น 12',
    desc: 'สำนักงานใหญ่ - On-site',
    badge: 'Follow-up',
    status: 'in_progress',
    customer: 'บริษัท B',
    type: 'Per-call',
    department: 'Facility',
    dueDate: '2025-11-26T10:00:00',
    location: '13.855857, 100.585652',
    technicians: [{ id: 'tech03', name: 'ช่างก้อง' }],
  },
  {
    id: 'WO-2025-0003',
    title: 'ทดสอบระบบกล้องวงจรปิด',
    desc: 'สาขาบางนา - Remote',
    badge: 'Review',
    status: 'done',
    customer: 'บริษัท C',
    type: 'Project',
    department: 'Security',
    dueDate: '2025-11-20T09:00:00',
    location: '13.855857, 100.585652',
    technicians: [{ id: 'tech02', name: 'ช่างบอย' }],
  },
  {
    id: 'WO-2025-0004',
    title: 'อัปเดตซอฟต์แวร์เครื่องแม่ข่าย',
    desc: 'ดาต้าเซ็นเตอร์ - Remote',
    badge: 'Delayed',
    status: 'rejected',
    customer: 'บริษัท D',
    type: 'MA',
    department: 'IT Ops',
    dueDate: '2025-11-28T18:00:00',
    location: '13.855857, 100.585652',
    technicians: [{ id: 'tech04', name: 'ช่างเก่ง' }],
  },
  {
    id: 'WO-2025-0005',
    title: 'ยกเลิกงานตรวจสอบสายสื่อสาร',
    desc: 'สำนักงานใหญ่ - On-site',
    badge: 'Canceled',
    status: 'canceled',
    customer: 'บริษัท E',
    type: 'Per-call',
    department: 'Network',
    dueDate: '2025-11-30T09:00:00',
    location: '13.855857, 100.585652',
    technicians: [],
  },
];

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(initialJobs);

  const updateJobStatus = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job)),
    );
  };

  const assignTechnicians = (id, technicians) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, technicians } : job,
      ),
    );
  };

  const value = useMemo(
    () => ({ jobs, updateJobStatus, assignTechnicians }),
    [jobs],
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) {
    throw new Error('useJobs must be used within JobsProvider');
  }
  return ctx;
}
