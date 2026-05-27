export const orders = {
  1: [
    { id: "ORD-001", title: "Medicine Order", description: "Paracetamol 500mg - 30 tablets", date: "2026-03-28", amount: 250, status: "delivered" },
    { id: "ORD-002", title: "Lab Test Kit", description: "Blood sugar monitoring kit", date: "2026-03-15", amount: 1200, status: "delivered" },
    { id: "ORD-003", title: "Medicine Order", description: "Vitamin D3 supplements - 60 capsules", date: "2026-02-20", amount: 450, status: "delivered" },
    { id: "ORD-004", title: "Medicine Order", description: "Paracetamol 500mg - 30 capsules", date: "2026-01-10", amount: 250, status: "cancelled" },
    { id: "ORD-005", title: "Wellness Kit", description: "Blood pressure monitor", date: "2025-12-05", amount: 2800, status: "delivered" },
    { id: "ORD-006", title: "Medicine Order", description: "Azithromycin 500mg - 5 tablets", date: "2025-11-18", amount: 180, status: "delivered" },
  ],
  2: [
    { id: "ORD-007", title: "Medicine Order", description: "Metformin 500mg - 60 tablets", date: "2026-03-20", amount: 320, status: "delivered" },
    { id: "ORD-008", title: "Lab Test", description: "HbA1c blood test", date: "2026-02-14", amount: 800, status: "pending" },
    { id: "ORD-009", title: "Medicine Order", description: "Lisinopril 10mg - 30 tablets", date: "2026-01-22", amount: 280, status: "delivered" },
    { id: "ORD-010", title: "Wellness Kit", description: "Pulse oximeter", date: "2025-12-10", amount: 1500, status: "delivered" },
  ],
  3: [
    { id: "ORD-011", title: "Medicine Order", description: "Ibuprofen 400mg - 20 tablets", date: "2025-11-30", amount: 150, status: "delivered" },
    { id: "ORD-012", title: "Lab Test", description: "Thyroid function test", date: "2025-10-25", amount: 1200, status: "delivered" },
    { id: "ORD-013", title: "Medicine Order", description: "Omeprazole 20mg - 30 capsules", date: "2025-09-15", amount: 220, status: "cancelled" },
  ],
};

// Default orders for users without specific orders
export const defaultOrders = [
  { id: "ORD-DEF-1", title: "Medicine Order", description: "Paracetamol 500mg - 30 tablets", date: "2026-03-28", amount: 250, status: "delivered" },
  { id: "ORD-DEF-2", title: "Lab Test", description: "Complete blood count", date: "2026-02-15", amount: 600, status: "pending" },
];
