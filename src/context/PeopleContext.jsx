import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';

const PeopleContext = createContext(null);

const SUP_KEY = 'techjob-supervisors-v1';
const TECH_KEY = 'techjob-technicians-v1';

const initialSupervisors = [
  {
    id: 'sup-01',
    name: 'หัวหน้าช่างเอก',
    phone: '0800000001',
    email: 'sup.ake@example.com',
    departmentId: 'it-support',
    createdAt: '2025-11-01T09:00:00.000Z',
  },
  {
    id: 'sup-02',
    name: 'หัวหน้าช่างนุ่น',
    phone: '0800000002',
    email: 'sup.noon@example.com',
    departmentId: 'network',
    createdAt: '2025-11-01T09:00:00.000Z',
  },
];

const initialTechnicians = [
  {
    id: 'tech-01',
    name: 'สมชาย',
    role: 'IT Support',
    departmentId: 'it-support',
    supervisorId: 'sup-01',
    phone: '0900000001',
    email: 'somchai@example.com',
    createdAt: '2025-11-01T10:00:00.000Z',
  },
  {
    id: 'tech-02',
    name: 'วสันต์',
    role: 'Facility',
    departmentId: 'facility',
    supervisorId: 'sup-01',
    phone: '0900000002',
    email: 'wasan@example.com',
    createdAt: '2025-11-01T10:30:00.000Z',
  },
  {
    id: 'tech-05',
    name: 'แบงค์',
    role: 'Facility',
    departmentId: 'facility',
    supervisorId: 'sup-01',
    phone: '0900000006',
    email: 'bank@example.com',
    createdAt: '2025-11-01T11:00:00.000Z',
  },
  {
    id: 'tech-03',
    name: 'พีระ',
    role: 'Network',
    departmentId: 'network',
    supervisorId: 'sup-02',
    phone: '0900000003',
    email: 'peera@example.com',
    createdAt: '2025-11-01T11:30:00.000Z',
  },
  {
    id: 'tech-04',
    name: 'กมล',
    role: 'IT Ops',
    departmentId: 'it-ops',
    supervisorId: 'sup-02',
    phone: '0900000004',
    email: 'kamol@example.com',
    createdAt: '2025-11-01T12:00:00.000Z',
  },
];

function loadOrDefault(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch (e) {
    console.error('Failed to load people from localStorage', e);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save people to localStorage', e);
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export function PeopleProvider({ children }) {
  const [supervisors, setSupervisors] = useState(() =>
    loadOrDefault(SUP_KEY, initialSupervisors),
  );
  const [technicians, setTechnicians] = useState(() =>
    loadOrDefault(TECH_KEY, initialTechnicians),
  );

  // Ensure seed supervisors (e.g., sup-01) are present if they were removed in storage
  useEffect(() => {
    setSupervisors((prev) => {
      const byId = new Map(prev.map((s) => [s.id, s]));
      initialSupervisors.forEach((seed) => {
        if (!byId.has(seed.id)) {
          byId.set(seed.id, seed);
        }
      });
      return Array.from(byId.values());
    });
  }, []);

  // sync ไป localStorage เวลาแก้ไข
  useEffect(() => {
    saveToStorage(SUP_KEY, supervisors);
  }, [supervisors]);

  useEffect(() => {
    saveToStorage(TECH_KEY, technicians);
  }, [technicians]);

  const techById = useMemo(
    () => Object.fromEntries(technicians.map((t) => [t.id, t])),
    [technicians],
  );
  const supById = useMemo(
    () => Object.fromEntries(supervisors.map((s) => [s.id, s])),
    [supervisors],
  );

  const addSupervisor = useCallback((supInput) => {
    setSupervisors((prev) => [
      ...prev,
      {
        id: createId('sup'),
        name: supInput.name,
        phone: supInput.phone,
        email: supInput.email,
        departmentId: supInput.departmentId,
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const addTechnician = useCallback((techInput) => {
    setTechnicians((prev) => [
      ...prev,
      {
        id: createId('tech'),
        name: techInput.name,
        role: techInput.role,
        phone: techInput.phone,
        email: techInput.email,
        departmentId: techInput.departmentId,
        supervisorId: techInput.supervisorId,
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const updateTechnician = useCallback((id, patch) => {
    setTechnicians((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  }, []);

  const removeTechnician = useCallback((id) => {
    setTechnicians((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeSupervisor = useCallback((id) => {
    // ถ้าจะให้ strict จริง ๆ ควรเช็คว่ามีช่างใต้หัวหน้าคนนี้รึเปล่า
    setSupervisors((prev) => prev.filter((s) => s.id !== id));
    setTechnicians((prev) =>
      prev.map((t) =>
        t.supervisorId === id ? { ...t, supervisorId: null } : t,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      supervisors,
      technicians,
      addSupervisor,
      addTechnician,
      updateTechnician,
      removeTechnician,
      removeSupervisor,
      getTechniciansByIds: (ids = []) =>
        ids.map((id) => techById[id]).filter(Boolean),
      getSupervisorById: (id) => (id ? supById[id] || null : null),
    }),
    [
      supervisors,
      technicians,
      addSupervisor,
      addTechnician,
      updateTechnician,
      removeTechnician,
      removeSupervisor,
      techById,
      supById,
    ],
  );

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
}

export const usePeople = () => {
  const ctx = useContext(PeopleContext);
  if (!ctx) {
    throw new Error('usePeople must be used within PeopleProvider');
  }
  return ctx;
};
