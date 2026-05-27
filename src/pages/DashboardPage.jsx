import { motion } from 'framer-motion';
import { Users, Crown, UserCheck, Users2, TrendingUp, Activity, Calendar, Heart, ArrowUpRight, Stethoscope, FlaskConical, Pill, Ambulance } from 'lucide-react';
import StatsCard from '../components/common/StatsCard.jsx';

const stats = [
  { label: 'Total Users',      value: '6',  icon: <Users size={20} className="text-slate-600 dark:text-slate-300" />,  iconBg: 'bg-slate-100 dark:bg-slate-800', gradient: 'linear-gradient(90deg,#64748b,#475569)' },
  { label: 'Prime Members',    value: '2',  icon: <Crown size={20} className="text-orange-600" />, iconBg: 'bg-orange-50 dark:bg-orange-950/50', gradient: 'linear-gradient(90deg,#f97316,#ea580c)' },
  { label: 'Active Users',     value: '5',  icon: <UserCheck size={20} className="text-sky-600" />, iconBg: 'bg-sky-50 dark:bg-sky-950/50',     gradient: 'linear-gradient(90deg,#0ea5e9,#0284c7)' },
  { label: 'Family Members',   value: '49', icon: <Users2 size={20} className="text-violet-600" />, iconBg: 'bg-violet-50 dark:bg-violet-950/50', gradient: 'linear-gradient(90deg,#8b5cf6,#7c3aed)' },
];

const activity = [
  { text: 'Alice Williams upgraded to Prime',       time: '2 min ago',  icon: Crown,       dot: 'bg-orange-400' },
  { text: 'New user David Kim registered',          time: '1 hr ago',   icon: Users,       dot: 'bg-emerald-400' },
  { text: 'Lab test booked — Priya Sharma',         time: '3 hrs ago',  icon: Activity,    dot: 'bg-sky-400' },
  { text: 'Consultation scheduled — Eva Lopez',     time: '5 hrs ago',  icon: Calendar,    dot: 'bg-violet-400' },
  { text: 'Medicine order delivered — Raj Patel',   time: 'Yesterday',  icon: Heart,       dot: 'bg-pink-400' },
];

const services = [
  { label: 'Consultations', val: 8,  total: 20, color: '#10b981', icon: Stethoscope },
  { label: 'Lab Tests',     val: 5,  total: 15, color: '#0ea5e9', icon: FlaskConical },
  { label: 'Medicine',      val: 12, total: 30, color: '#8b5cf6', icon: Pill },
  { label: 'Ambulance',     val: 2,  total: 10, color: '#f97316', icon: Ambulance },
];

const container = { hidden: {}, show: { transition: { staggerChildren: .07 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: .4, ease: [.16,1,.3,1] } } };

export default function DashboardPage() {
  return (
    <div className="space-y-6 page-enter max-w-7xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold text-slate-900 dark:text-white"
          >
            Good morning, Admin 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-0.5"
          >
            Here's what's happening with Jiva Health today.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 }}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-ring relative" />
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Live Dashboard</span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatsCard key={s.label} {...s} delay={i * 0.08} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Activity feed */}
        <motion.div
          variants={container} initial="hidden" animate="show"
          className="lg:col-span-2 card p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
              <p className="text-xs text-slate-400 mt-0.5">Latest actions across the platform</p>
            </div>
            <button className="btn-ghost text-xs gap-1">
              View all <ArrowUpRight size={12} />
            </button>
          </div>

          {/* Timeline */}
          <div className="relative space-y-1">
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-slate-100 dark:bg-slate-800" />
            {activity.map((a, i) => (
              <motion.div key={i} variants={item}
                className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
              >
                <div className={`relative z-10 mt-0.5 w-5 h-5 ${a.dot} rounded-full flex-shrink-0 flex items-center justify-center shadow-sm`}>
                  <a.icon size={10} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{a.text}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
                <ArrowUpRight size={13} className="text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .5, delay: .2 }}
          className="card p-5 space-y-5"
        >
          <div>
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">Today's Services</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time health ops summary</p>
          </div>

          <div className="space-y-4">
            {services.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: .3 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${s.color}18` }}>
                      <s.icon size={12} style={{ color: s.color }} />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{s.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{s.val}<span className="font-normal text-slate-400">/{s.total}</span></span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.val / s.total) * 100}%` }}
                    transition={{ duration: 1, delay: .5 + i * .1, ease: [.16,1,.3,1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}cc, ${s.color})` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick metric */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}
            className="rounded-xl p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)' }}
          >
            <div className="absolute inset-0 dot-bg opacity-20" />
            <div className="relative">
              <p className="text-xs text-emerald-300 font-medium mb-1">Monthly Revenue</p>
              <p className="text-2xl font-display font-bold text-white">₹2.4L</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={11} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-semibold">+18.2% vs last month</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom row — quick user table preview */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }}
        className="card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white">Top Active Users</h2>
          <button className="btn-ghost text-xs gap-1">View all users <ArrowUpRight size={12} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Priya Sharma',   role: 'Doctor',  apt: 47, avatar: 'PS', color: 'bg-rose-500' },
            { name: 'David Kim',      role: 'Nurse',   apt: 30, avatar: 'DK', color: 'bg-emerald-500' },
            { name: 'Alice Williams', role: 'Patient', apt: 12, avatar: 'AW', color: 'bg-teal-500' },
          ].map((u, i) => (
            <motion.div key={u.name}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .5 + i * .07 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
            >
              <div className={`w-9 h-9 ${u.color} rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{u.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{u.name}</p>
                <p className="text-xs text-slate-400">{u.role} · {u.apt} appointments</p>
              </div>
              <ArrowUpRight size={13} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
