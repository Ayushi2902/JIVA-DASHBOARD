export const payments = {
  1: [
    { id: "PAY-001", title: "Consultation Fee", description: "Dr. Priya Sharma - General Checkup", date: "2026-03-28", amount: 150, status: "completed", method: "UPI" },
    { id: "PAY-002", title: "Lab Test", description: "Blood sugar + HbA1c panel", date: "2026-03-15", amount: 800, status: "completed", method: "Card" },
    { id: "PAY-003", title: "Medicine Order", description: "Paracetamol + Vitamin D3", date: "2026-02-20", amount: 700, status: "completed", method: "UPI" },
    { id: "PAY-004", title: "Ambulance Booking", description: "Emergency transport - 8km", date: "2026-01-05", amount: 1200, status: "completed", method: "Card" },
    { id: "PAY-005", title: "Consultation Fee", description: "Dr. Anand Kumar - Cardiology", date: "2025-12-18", amount: 500, status: "failed", method: "Net Banking" },
    { id: "PAY-006", title: "Lab Test", description: "Lipid profile test", date: "2025-11-22", amount: 450, status: "completed", method: "UPI" },
  ],
  2: [
    { id: "PAY-007", title: "Consultation Fee", description: "Dr. Kumar - Diabetes specialist", date: "2026-03-20", amount: 800, status: "completed", method: "Card" },
    { id: "PAY-008", title: "Medicine Order", description: "Metformin monthly supply", date: "2026-02-14", amount: 320, status: "pending", method: "UPI" },
    { id: "PAY-009", title: "Lab Test", description: "Annual health checkup", date: "2026-01-10", amount: 2200, status: "completed", method: "Card" },
  ],
};

export const defaultPayments = [
  { id: "PAY-DEF-1", title: "Consultation Fee", description: "General health consultation", date: "2026-03-28", amount: 150, status: "completed", method: "UPI" },
  { id: "PAY-DEF-2", title: "Lab Test", description: "Blood panel test", date: "2026-02-15", amount: 600, status: "completed", method: "Card" },
];
