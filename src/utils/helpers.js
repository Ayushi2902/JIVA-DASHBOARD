export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';
};

export const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'active': return 'badge-active';
    case 'inactive': return 'badge-inactive';
    case 'delivered': return 'badge-delivered';
    case 'pending': return 'badge-pending';
    case 'cancelled': return 'badge-cancelled';
    case 'completed': return 'badge-completed';
    default: return 'badge bg-slate-100 text-slate-600';
  }
};

export const getRoleClass = (role) => {
  switch (role?.toLowerCase()) {
    case 'patient': return 'badge-patient';
    case 'nurse': return 'badge-nurse';
    case 'doctor': return 'badge-doctor';
    default: return 'badge bg-slate-100 text-slate-600';
  }
};
