import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowLeft, Crown, ShoppingBag, Phone, Calendar, Users2,
  CreditCard, Mail, User, Heart, MapPin, Pencil, Plus, Trash2,
  Activity, CheckCircle2, Clock, ChevronDown
} from 'lucide-react';
import Avatar from '../components/common/Avatar.jsx';
import OrderCard from '../components/orders/OrderCard.jsx';
import PaymentCard from '../components/payments/PaymentCard.jsx';
import FamilyMemberCard from '../components/family/FamilyMemberCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Modal from '../components/common/Modal.jsx';
import AddEditUserModal from '../components/users/AddEditUserModal.jsx';
import { SkeletonProfile } from '../components/common/Skeleton.jsx';
import { userService } from '../services/userService.js';
import { orderService } from '../services/orderService.js';
import { paymentService } from '../services/paymentService.js';
import { familyService } from '../services/familyService.js';
import { useUsersStore } from '../store/index.js';
import { formatDate, formatCurrency, getStatusClass } from '../utils/helpers.js';

const TABS = [
  { key: 'Overview',          icon: User },
  { key: 'Orders & Bookings', icon: ShoppingBag },
  { key: 'Payments',          icon: CreditCard },
  { key: 'Family Members',    icon: Users2 },
];
const BLOOD_GROUPS = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
const GENDERS = ['Male','Female','Other'];
const RELATIONS = ['Father','Mother','Son','Daughter','Husband','Wife','Brother','Sister','Other'];

export default function UserProfilePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { updateUser } = useUsersStore();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('Overview');
  const [editOpen, setEditOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [addFamilyOpen, setAddFamilyOpen] = useState(false);
  const [familyForm, setFamilyForm] = useState({ name:'',relation:'',phone:'',dob:'',gender:'',bloodGroup:'' });

  useEffect(() => {
    setLoading(true);
    Promise.all([
      userService.getById(id),
      orderService.getByUserId(Number(id)),
      paymentService.getByUserId(Number(id)),
      familyService.getByUserId(Number(id)),
    ]).then(([u, o, p, f]) => { setUser(u); setOrders(o); setPayments(p); setFamilyMembers(f); setLoading(false); });
  }, [id]);

  const handleEditUser   = async (data) => { try { const u = await userService.update(id, data); setUser(u); updateUser(id, u); toast.success('Profile updated!'); } catch { toast.error('Update failed'); } };
  const handleStatusChange = async (s) => { try { await userService.updateStatus(id, s); setUser(u=>({...u,status:s})); updateUser(id,{status:s}); setStatusOpen(false); toast.success(`Status: ${s}`); } catch { toast.error('Failed'); } };
  const handleUpgrade    = async () => { try { await userService.upgradeToPrime(id); setUser(u=>({...u,plan:'prime'})); updateUser(id,{plan:'prime'}); toast.success('Upgraded to Prime! 🎉'); } catch { toast.error('Upgrade failed'); } };
  const handleAddFamily  = async () => { try { const m = await familyService.add(Number(id), familyForm); setFamilyMembers(f=>[...f,m]); setAddFamilyOpen(false); setFamilyForm({name:'',relation:'',phone:'',dob:'',gender:'',bloodGroup:''}); toast.success('Family member added!'); } catch { toast.error('Failed'); } };
  const handleDeleteFamily = async (mid) => { try { await familyService.remove(Number(id), mid); setFamilyMembers(f=>f.filter(m=>m.id!==mid)); toast.success('Removed'); } catch { toast.error('Failed'); } };

  if (loading) return <div className="page-enter"><SkeletonProfile /></div>;
  if (!user) return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className="text-slate-500">User not found.</p>
      <button onClick={() => nav('/users')} className="btn-ghost mt-3"><ArrowLeft size={14}/>Go back</button>
    </div>
  );

  const statBlocks = [
    { label:'Total Orders',            value: user.totalOrders,        icon: ShoppingBag, bg:'from-sky-500/10 to-sky-500/5',    iconColor:'text-sky-500' },
    { label:'Bookings & Appointments', value: user.totalBookings,       icon: Phone,       bg:'from-violet-500/10 to-violet-500/5', iconColor:'text-violet-500' },
    { label:'Family Members',          value: user.totalFamilyMembers,  icon: Users2,      bg:'from-emerald-500/10 to-emerald-500/5', iconColor:'text-emerald-500' },
    { label:'Total Spent',             value: formatCurrency(user.totalSpent), icon: CreditCard, bg:'from-orange-500/10 to-orange-500/5', iconColor:'text-orange-500' },
  ];

  return (
    <div className="space-y-5 page-enter max-w-6xl">

      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3 }} transition={{ duration: .2 }}
        onClick={() => nav('/users')}
        className="btn-ghost -ml-1"
      >
        <ArrowLeft size={15} /> Back to User Management
      </motion.button>

      {/* Profile header card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .45, ease: [.16,1,.3,1] }}
        className="card overflow-hidden"
      >
        {/* Gradient banner */}
        <div className="relative h-20 overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#064e3b 0%,#065f46 50%,#0f766e 100%)' }}>
          <div className="absolute inset-0 dot-bg opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent" />
          {user.plan === 'prime' && (
            <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-orange-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <Crown size={11} className="text-white" />
              <span className="text-white text-[11px] font-bold">PRIME</span>
            </div>
          )}
        </div>

        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          {/* Avatar overlapping banner */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-8">
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className={`w-20 h-20 ${user.color} rounded-2xl flex items-center justify-center text-white text-2xl font-display font-bold shadow-xl ring-4 ring-white dark:ring-[#0f1724]`}>
                  {user.avatar}
                </div>
                <span className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0f1724] ${user.status==='active'?'bg-emerald-400':'bg-slate-300'}`} />
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className={getStatusClass(user.status)}>{user.status==='active'?<><CheckCircle2 size={9}/>Active</>:<><Clock size={9}/>Inactive</>}</span>
                  <span className="badge bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400">{user.role}</span>
                  <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">ID: #{user.id}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Calendar size={10}/> Joined {formatDate(user.joinedAt)}</span>
                  <span className="flex items-center gap-1"><Activity size={10}/> Last active {formatDate(user.lastActive)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pb-1">
              {user.plan !== 'prime' && (
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} onClick={handleUpgrade} className="btn-prime text-xs py-2">
                  <Crown size={13} /> Upgrade to Prime
                </motion.button>
              )}
              <div className="relative">
                <button
                  onClick={() => setStatusOpen(o=>!o)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-[#0f1724]"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${user.status==='active'?'bg-emerald-400':'bg-slate-400'}`}/>
                  {user.status==='active'?'Active':'Inactive'}
                  <ChevronDown size={13} className={`text-slate-400 transition-transform ${statusOpen?'rotate-180':''}`}/>
                </button>
                <AnimatePresence>
                  {statusOpen && (
                    <motion.div
                      initial={{ opacity:0, y:6, scale:.96 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:6, scale:.96 }}
                      className="absolute right-0 top-full mt-1.5 w-36 card shadow-xl z-20 overflow-hidden"
                    >
                      {['active','inactive'].map(s => (
                        <button key={s} onClick={() => handleStatusChange(s)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${user.status===s?'text-emerald-600 dark:text-emerald-400 font-semibold':'text-slate-700 dark:text-slate-300'}`}>
                          {s.charAt(0).toUpperCase()+s.slice(1)}
                          {user.status===s && <CheckCircle2 size={13} className="text-emerald-500"/>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statBlocks.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.4, delay: i*.07, ease:[.16,1,.3,1] }}
            whileHover={{ y:-2 }}
            className={`card p-4 bg-gradient-to-br ${s.bg} transition-all duration-300 cursor-default`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.label}</p>
              <s.icon size={15} className={s.iconColor} />
            </div>
            <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs + content */}
      <motion.div
        initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2 }}
        className="card overflow-hidden"
      >
        {/* Tab bar */}
        <div className="border-b border-slate-100 dark:border-slate-800 px-2 flex overflow-x-auto bg-slate-50/50 dark:bg-slate-800/30">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`tab-btn ${tab===t.key?'active':''}`}>
              <t.icon size={14}/> {t.key}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:.25, ease:[.16,1,.3,1] }}
            className="p-5"
          >

            {/* OVERVIEW */}
            {tab==='Overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-slate-800 dark:text-slate-100">Personal Information</h3>
                    <button onClick={() => setEditOpen(true)} className="btn-ghost text-xs py-1.5">
                      <Pencil size={12}/> Edit
                    </button>
                  </div>
                  <div className="space-y-1">
                    {[
                      { icon: Mail,     label: 'Email',         value: user.email },
                      { icon: Phone,    label: 'Phone',         value: user.phone },
                      { icon: Calendar, label: 'Date of Birth', value: formatDate(user.dateOfBirth) },
                      { icon: User,     label: 'Gender',        value: user.gender },
                      { icon: Heart,    label: 'Blood Group',   value: user.bloodGroup },
                    ].map((row, i) => (
                      <motion.div key={row.label}
                        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                        transition={{ delay: i*.04 }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                      >
                        <div className="w-7 h-7 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-colors">
                          <row.icon size={13} className="text-slate-400 group-hover:text-emerald-500 transition-colors"/>
                        </div>
                        <span className="text-xs font-medium text-slate-400 w-24 flex-shrink-0">{row.label}</span>
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{row.value || '—'}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-slate-800 dark:text-slate-100">Addresses</h3>
                    <button className="btn-ghost text-xs py-1.5"><Plus size={12}/> Add</button>
                  </div>
                  {user.address ? (
                    <motion.div initial={{ opacity:0, scale:.98 }} animate={{ opacity:1, scale:1 }}
                      className="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-900/30 p-4"
                      style={{ background: 'linear-gradient(135deg,rgba(16,185,129,.05),rgba(5,150,105,.03))' }}
                    >
                      <div className="flex gap-3">
                        <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin size={16} className="text-emerald-500"/>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Home</p>
                            <span className="badge badge-active text-[10px]">Default</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {user.address.area}<br/>
                            {user.address.city}, {user.address.state} {user.address.pinCode}<br/>
                            {user.address.country}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"><Pencil size={12}/></button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"><Trash2 size={12}/></button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <EmptyState icon={<MapPin size={20} className="text-slate-400"/>} title="No addresses" description="Add an address for this user."/>
                  )}
                </div>
              </div>
            )}

            {/* ORDERS */}
            {tab==='Orders & Bookings' && (
              <div>
                <h3 className="font-display font-semibold text-slate-800 dark:text-slate-100 mb-4">Order History</h3>
                {orders.length===0
                  ? <EmptyState icon={<ShoppingBag size={22} className="text-slate-400"/>} title="No orders yet"/>
                  : <div className="space-y-2.5">{orders.map((o,i) => <OrderCard key={o.id} order={o} index={i}/>)}</div>
                }
              </div>
            )}

            {/* PAYMENTS */}
            {tab==='Payments' && (
              <div>
                <h3 className="font-display font-semibold text-slate-800 dark:text-slate-100 mb-4">Payment History</h3>
                {payments.length===0
                  ? <EmptyState icon={<CreditCard size={22} className="text-slate-400"/>} title="No payments yet"/>
                  : <div className="space-y-2.5">{payments.map((p,i) => <PaymentCard key={p.id} payment={p} index={i}/>)}</div>
                }
              </div>
            )}

            {/* FAMILY */}
            {tab==='Family Members' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-slate-800 dark:text-slate-100">Family Members</h3>
                  <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }} onClick={() => setAddFamilyOpen(true)} className="btn-primary text-xs py-2">
                    <Plus size={13}/> Add Member
                  </motion.button>
                </div>
                {familyMembers.length===0
                  ? <EmptyState icon={<Users2 size={22} className="text-slate-400"/>} title="No family members" description="Add family members for this user."/>
                  : <div className="space-y-2.5">{familyMembers.map((m,i) => <FamilyMemberCard key={m.id} member={m} index={i} onDelete={handleDeleteFamily}/>)}</div>
                }
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AddEditUserModal open={editOpen} onClose={() => setEditOpen(false)} onSubmit={handleEditUser} editUser={user}/>

      <Modal open={addFamilyOpen} onClose={() => setAddFamilyOpen(false)} title="Add Family Member" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
            <input className="input-field" placeholder="Name" value={familyForm.name} onChange={e => setFamilyForm(f=>({...f,name:e.target.value}))}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:'Relation', field:'relation', type:'select', options: RELATIONS },
              { label:'Gender',   field:'gender',   type:'select', options: GENDERS },
              { label:'Phone',    field:'phone',    type:'input',  placeholder:'+91...' },
              { label:'D.O.B',    field:'dob',      type:'date' },
              { label:'Blood Group', field:'bloodGroup', type:'select', options: BLOOD_GROUPS },
            ].map(f => (
              <div key={f.field}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{f.label}</label>
                {f.type==='select'
                  ? <select className="select-field" value={familyForm[f.field]} onChange={e => setFamilyForm(fm=>({...fm,[f.field]:e.target.value}))}>
                      <option value="">Select</option>
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  : <input type={f.type||'text'} className="input-field" placeholder={f.placeholder} value={familyForm[f.field]} onChange={e => setFamilyForm(fm=>({...fm,[f.field]:e.target.value}))}/>
                }
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setAddFamilyOpen(false)} className="btn-ghost">Cancel</button>
            <button onClick={handleAddFamily} className="btn-primary">Add Member</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
