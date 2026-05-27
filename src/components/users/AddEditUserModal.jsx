import { useState, useEffect } from 'react';
import Modal from '../common/Modal.jsx';

const STATES = ['Andhra Pradesh','Delhi','Gujarat','Karnataka','Maharashtra','Rajasthan','Tamil Nadu','Uttar Pradesh','West Bengal','Other'];
const BLOOD_GROUPS = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
const GENDERS = ['Male','Female','Other','Prefer not to say'];

export default function AddEditUserModal({ open, onClose, onSubmit, editUser = null }) {
  const isEdit = !!editUser;
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dateOfBirth: '',
    gender: '', bloodGroup: '', role: 'Patient',
    address: { area: '', city: '', state: '', pinCode: '', country: 'India' }
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editUser) {
      setForm({
        name: editUser.name || '',
        email: editUser.email || '',
        phone: editUser.phone || '',
        dateOfBirth: editUser.dateOfBirth || '',
        gender: editUser.gender || '',
        bloodGroup: editUser.bloodGroup || '',
        role: editUser.role || 'Patient',
        address: editUser.address || { area: '', city: '', state: '', pinCode: '', country: 'India' }
      });
    } else {
      setForm({ name: '', email: '', phone: '', dateOfBirth: '', gender: '', bloodGroup: '', role: 'Patient', address: { area: '', city: '', state: '', pinCode: '', country: 'India' } });
    }
    setErrors({});
  }, [editUser, open]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setAddr = (k, v) => setForm(f => ({ ...f, address: { ...f.address, [k]: v } }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    await onSubmit(form);
    setSaving(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit User' : 'Add New User'}
      subtitle={isEdit ? 'Update user account details' : 'Create a new user account with role and permissions'}
      size="md"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name <span className="text-red-500">*</span></label>
            <input className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-200' : ''}`} placeholder="e.g., John Smith" value={form.name} onChange={e => set('name', e.target.value)} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email <span className="text-red-500">*</span></label>
            <input className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-200' : ''}`} placeholder="john.smith@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
            <input className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date of Birth</label>
            <input type="date" className="input-field" value={form.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Gender</label>
            <select className="select-field" value={form.gender} onChange={e => set('gender', e.target.value)}>
              <option value="">Select gender</option>
              {GENDERS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Blood Group</label>
            <select className="select-field" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
            <select className="select-field" value={form.role} onChange={e => set('role', e.target.value)}>
              <option>Patient</option>
              <option>Doctor</option>
              <option>Nurse</option>
            </select>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-700" />

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Area Detail</label>
          <input className="input-field" placeholder="House/Flat No., Building Name, Street" value={form.address.area} onChange={e => setAddr('area', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Pin Code</label>
            <input className="input-field" placeholder="400001" value={form.address.pinCode} onChange={e => setAddr('pinCode', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">City</label>
            <input className="input-field" placeholder="Mumbai" value={form.address.city} onChange={e => setAddr('city', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">State</label>
            <select className="select-field" value={form.address.state} onChange={e => setAddr('state', e.target.value)}>
              <option value="">Select state</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Country</label>
            <input className="input-field" value={form.address.country} onChange={e => setAddr('country', e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="btn-primary min-w-[100px] justify-center">
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Saving...
              </span>
            ) : isEdit ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
