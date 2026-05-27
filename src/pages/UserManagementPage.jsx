import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Crown, UserCheck, Users2, Filter, SlidersHorizontal, Search } from 'lucide-react';
import { toast } from 'sonner';
import StatsCard from '../components/common/StatsCard.jsx';
import UserRow from '../components/users/UserRow.jsx';
import AddEditUserModal from '../components/users/AddEditUserModal.jsx';
import { SkeletonRow, SkeletonCard } from '../components/common/Skeleton.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { userService } from '../services/userService.js';
import { useUsersStore } from '../store/index.js';

export default function UserManagementPage() {
  const { users, loading, setUsers, setLoading, addUser, updateUser } = useUsersStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    userService.getAll().then(data => { setUsers(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => users.filter(u => {
    const q = search.toLowerCase();
    return (
      (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone?.includes(q)) &&
      (statusFilter === 'all' || u.status === statusFilter) &&
      (roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase())
    );
  }), [users, search, statusFilter, roleFilter]);

  const stats = {
    total: users.length,
    prime: users.filter(u => u.plan === 'prime').length,
    nonPrime: users.filter(u => u.plan !== 'prime').length,
    family: users.reduce((a, u) => a + (u.totalFamilyMembers || 0), 0),
  };

  const handleAdd = async (data) => {
    try { const user = await userService.create(data); addUser(user); toast.success('User added!'); }
    catch { toast.error('Failed to add user'); }
  };
  const handleEdit = async (data) => {
    try { const u = await userService.update(editUser.id, data); updateUser(editUser.id, u); toast.success('User updated!'); }
    catch { toast.error('Update failed'); }
  };
  const handleUpgrade = async (user) => {
    try { await userService.upgradeToPrime(user.id); updateUser(user.id, { plan: 'prime' }); toast.success(`${user.name} upgraded to Prime! 🎉`); }
    catch { toast.error('Upgrade failed'); }
  };

  const activeFilters = (statusFilter !== 'all' ? 1 : 0) + (roleFilter !== 'all' ? 1 : 0);

  return (
    <div className="space-y-6 page-enter max-w-7xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            User Management
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage user accounts and permissions
          </motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 }}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
          onClick={() => { setEditUser(null); setModalOpen(true); }}
          className="btn-primary"
        >
          <Plus size={16} /> Add User
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? [...Array(4)].map((_,i) => <SkeletonCard key={i} />) : (
          <>
            <StatsCard label="Total Users"      value={stats.total}   icon={<Users size={20} className="text-slate-500" />}     iconBg="bg-slate-100 dark:bg-slate-800"         gradient="linear-gradient(90deg,#64748b,#475569)" delay={0} />
            <StatsCard label="Prime Members"    value={stats.prime}   icon={<Crown size={20} className="text-orange-500" />}    iconBg="bg-orange-50 dark:bg-orange-950/50"     gradient="linear-gradient(90deg,#f97316,#ea580c)" delay={.07} />
            <StatsCard label="Non-Prime Users"  value={stats.nonPrime}icon={<UserCheck size={20} className="text-sky-500" />}   iconBg="bg-sky-50 dark:bg-sky-950/50"           gradient="linear-gradient(90deg,#0ea5e9,#0284c7)" delay={.14} />
            <StatsCard label="Family Members"   value={stats.family}  icon={<Users2 size={20} className="text-violet-500" />}   iconBg="bg-violet-50 dark:bg-violet-950/50"     gradient="linear-gradient(90deg,#8b5cf6,#7c3aed)" delay={.21} />
          </>
        )}
      </div>

      {/* Search + filter bar */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
        className="card p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="input-field pl-10"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }}
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-white text-[10px] hover:bg-slate-400 transition-colors"
                >✕</motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter toggle */}
          <button onClick={() => setFiltersOpen(o => !o)}
            className={`btn-ghost gap-2 flex-shrink-0 border ${filtersOpen ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700'}`}>
            <SlidersHorizontal size={15} />
            Filters
            {activeFilters > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">{activeFilters}</span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: .22 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Filter size={13} className="text-slate-400" />
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="select-field w-36 h-9 text-sm">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="select-field w-32 h-9 text-sm">
                  <option value="all">All Roles</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                </select>
                {activeFilters > 0 && (
                  <button onClick={() => { setStatusFilter('all'); setRoleFilter('all'); }}
                    className="text-xs text-red-500 hover:text-red-600 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                    Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results meta */}
      {!loading && (
        <div className="flex items-center justify-between">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-600 dark:text-slate-300">{filtered.length}</span> of <span className="font-semibold text-slate-600 dark:text-slate-300">{users.length}</span> users
          </motion.p>
          {search && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Filtered by "{search}"</span>}
        </div>
      )}

      {/* List */}
      <div className="space-y-2.5">
        {loading ? (
          [...Array(4)].map((_,i) => <SkeletonRow key={i} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Users size={24} className="text-slate-400" />}
            title="No users found"
            description="Try adjusting your search or clearing the filters."
            action={<button onClick={() => { setSearch(''); setStatusFilter('all'); setRoleFilter('all'); }} className="btn-ghost text-sm">Clear all filters</button>}
          />
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((user, i) => (
              <div key={user.id} className="relative">
                <UserRow user={user} index={i} onEdit={u => { setEditUser(u); setModalOpen(true); }} onUpgrade={handleUpgrade} />
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <AddEditUserModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditUser(null); }}
        onSubmit={editUser ? handleEdit : handleAdd}
        editUser={editUser}
      />
    </div>
  );
}
