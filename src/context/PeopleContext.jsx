import { createContext, useContext, useMemo, useState } from 'react';

const PeopleContext = createContext(null);

const initialSupervisors = [
  { id: 'sup-01', name: 'หัวหน้าช่างเอก', phone: '0800000001' },
  { id: 'sup-02', name: 'หัวหน้าช่างนุ่น', phone: '0800000002' },
];

const initialTechnicians = [
  { id: 'tech-01', name: 'สมชาย', role: 'ช่างไฟ', supervisorId: 'sup-01', phone: '0900000001' },
  { id: 'tech-02', name: 'วสันต์', role: 'ช่างแอร์', supervisorId: 'sup-01', phone: '0900000002' },
  { id: 'tech-03', name: 'พีระ', role: 'ช่างไฟ', supervisorId: 'sup-02', phone: '0900000003' },
  { id: 'tech-04', name: 'กมล', role: 'ช่างแอร์', supervisorId: 'sup-02', phone: '0900000004' },
];

export function PeopleProvider({ children }) {
  const [supervisors, setSupervisors] = useState(initialSupervisors);
  const [technicians, setTechnicians] = useState(initialTechnicians);

  const addSupervisor = (sup) => {
    setSupervisors((prev) => [...prev, sup]);
  };

  const addTechnician = (tech) => {
    setTechnicians((prev) => [...prev, tech]);
  };

  const updateTechnician = (id, patch) => {
    setTechnicians((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  };

  const value = useMemo(
    () => ({
      supervisors,
      technicians,
      addSupervisor,
      addTechnician,
      updateTechnician,
    }),
    [supervisors, technicians],
  );

  return <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>;
}

export const usePeople = () => {
  const ctx = useContext(PeopleContext);
  if (!ctx) {
    throw new Error('usePeople must be used within PeopleProvider');
  }
  return ctx;
};
