import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, Briefcase, ChevronDown,
  Stethoscope, FlaskConical, Pill, Ambulance, Store, BarChart3,
  ShieldCheck, Settings, X, Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { useSidebarStore } from '../store/index.js';

const NAV = [
  { label: 'Dashboard',       icon: LayoutDashboard, to: '/' },
  { label: 'Organization',    icon: Building2,        to: '/organization' },
  { label: 'User Management', icon: Users,            to: '/users' },
  {
    label: 'Services', icon: Briefcase, children: [
      { label: 'Consultation',    icon: Stethoscope,  to: '/services/consultation' },
      { label: 'Lab Test Booking',icon: FlaskConical,  to: '/services/lab' },
      { label: 'Medicine Orders', icon: Pill,          to: '/services/medicine' },
      { label: 'Ambulance Booking',icon: Ambulance,   to: '/services/ambulance' },
      { label: 'Vendor & Partners',icon: Store,        to: '/services/vendors' },
    ],
  },
  { label: 'Report',     icon: BarChart3,  to: '/report' },
  { label: 'User Access',icon: ShieldCheck,to: '/access' },
  { label: 'Setting',    icon: Settings,   to: '/settings' },
];

function NavItem({ item, collapsed }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  if (item.children) {
    const childActive = item.children.some(c => pathname.startsWith(c.to));
    return (
      <div>
        <button
          onClick={() => setOpen(o => !o)}
          className={`sidebar-link w-full ${childActive ? 'active' : ''}`}
        >
          <item.icon size={17} className="flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: .2 }}>
                <ChevronDown size={13} />
              </motion.div>
            </>
          )}
        </button>
        <AnimatePresence initial={false}>
          {open && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: .22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-emerald-100 dark:border-emerald-900/40 pl-3">
                {item.children.map((child, i) => (
                  <motion.div
                    key={child.to}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink to={child.to} className={({ isActive }) => `sidebar-link text-xs py-2 ${isActive ? 'active' : ''}`}>
                      <child.icon size={13} className="flex-shrink-0" />
                      <span>{child.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
    >
      {({ isActive }) => (
        <>
          <item.icon size={17} className={`flex-shrink-0 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
          {!collapsed && <span>{item.label}</span>}
          {isActive && !collapsed && (
            <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ collapsed, onClose }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a1120]">
      {/* Logo */}
      <div className={`flex items-center justify-between px-4 py-5 border-b border-slate-100 dark:border-slate-800/60 ${collapsed ? 'px-3' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="relative w-9 h-9 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="white" fillOpacity=".9"/>
              </svg>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-[#0a1120] pulse-ring" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-display font-bold text-[17px] leading-none text-slate-900 dark:text-white tracking-tight">Jiva</p>
              <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 mt-0.5">Health Admin</p>
            </div>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden ml-2">
            <X size={15} className="text-slate-500" />
          </button>
        )}
      </div>

      {/* Label */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600">Navigation</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
        {NAV.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: .3 }}
          >
            <NavItem item={item} collapsed={collapsed} />
          </motion.div>
        ))}
      </nav>

      {/* Upgrade banner */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="relative overflow-hidden rounded-xl p-3.5"
            style={{ background: 'linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%)' }}>
            <div className="absolute inset-0 dot-bg opacity-30" />
            <div className="relative flex items-center gap-2.5">
              <div className="w-7 h-7 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-100">Upgrade Plan</p>
                <p className="text-[10px] text-emerald-400">Unlock all features</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/60">
        <div className="relative overflow-hidden rounded-2xl p-3 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg,#10b981 0%,#059669 100%)' }}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
            <span className="text-white font-bold text-sm font-display">AD</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate leading-tight">Admin User</p>
              <p className="text-emerald-100/80 text-[11px] truncate">Admin@healthcare.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { open, mobileOpen, closeMobile } = useSidebarStore();
  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: open ? 256 : 72 }}
        transition={{ duration: .28, ease: [.4,0,.2,1] }}
        className="hidden lg:flex flex-col flex-shrink-0 border-r border-slate-100 dark:border-slate-800/60 overflow-hidden"
      >
        <SidebarContent collapsed={!open} />
      </motion.aside>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed left-0 top-0 h-full z-50 w-72 border-r border-slate-100 dark:border-slate-800/60 shadow-2xl lg:hidden"
            >
              <SidebarContent collapsed={false} onClose={closeMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
