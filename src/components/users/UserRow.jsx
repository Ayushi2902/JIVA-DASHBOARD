import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Eye, Pencil, Crown, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar.jsx';
import { formatDate, getStatusClass, getRoleClass } from '../../utils/helpers.js';

export default function UserRow({ user, index, onEdit, onUpgrade }) {
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: .35, delay: index * 0.055, ease: [.16,1,.3,1] }}
      whileHover={{ y: -1 }}
      className="card group cursor-default"
      style={{ transition: 'box-shadow .25s ease, transform .25s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,.07), 0 2px 8px rgba(0,0,0,.04)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
    >
      {/* Hover accent left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Identity */}
        <div className="flex items-center gap-3.5 min-w-[220px]">
          <div className="relative">
            <Avatar initials={user.avatar} color={user.color} />
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#0f1724] ${user.status === 'active' ? 'bg-emerald-400' : 'bg-slate-300'}`} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{user.name}</p>
            <div className="flex items-center flex-wrap gap-1.5 mt-1">
              <span className={getRoleClass(user.role)}>{user.role}</span>
              <span className={getStatusClass(user.status)}>{user.status === 'active' ? 'Active' : 'Inactive'}</span>
              {user.plan === 'prime' && (
                <span className="badge bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <Crown size={9} />Prime
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex-1 space-y-1.5 min-w-[180px]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
              <Mail size={10} className="text-slate-400" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
              <Phone size={10} className="text-slate-400" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">{user.phone}</span>
          </div>
        </div>

        {/* Join date */}
        <div className="hidden lg:block min-w-[110px]">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1 flex items-center gap-1">
            <Calendar size={9} /> Joined
          </p>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{formatDate(user.joinedAt)}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Last: {formatDate(user.lastActive)}</p>
        </div>

        {/* Appointments bubble */}
        <div className="hidden md:flex flex-col items-center min-w-[72px]">
          <motion.div
            whileHover={{ scale: 1.12 }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-emerald-700 dark:text-emerald-300"
            style={{ background: 'linear-gradient(135deg,rgba(16,185,129,.12),rgba(5,150,105,.06))' }}
          >
            {user.appointments}
          </motion.div>
          <p className="text-[10px] text-slate-400 mt-1 text-center">Appts</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {user.plan !== 'prime' && (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
              onClick={() => onUpgrade(user)}
              className="btn-prime py-1.5 px-3 text-xs"
            >
              <Crown size={12} /> Upgrade
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
            onClick={() => nav(`/users/${user.id}`)}
            className="btn-ghost py-1.5 px-3 text-xs"
          >
            <Eye size={13} /> View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
            onClick={() => onEdit(user)}
            className="btn-ghost py-1.5 px-3 text-xs"
          >
            <Pencil size={13} /> Edit
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
