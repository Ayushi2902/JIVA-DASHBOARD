import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Bell, Sun, Moon, X, Command } from 'lucide-react';
import { useSidebarStore, useThemeStore } from '../store/index.js';

const NOTIFICATIONS = [
  { id:1, text:'Alice Williams upgraded to Prime', time:'2 min ago', unread:true },
  { id:2, text:'New lab test booking — Priya Sharma', time:'1 hr ago', unread:true },
  { id:3, text:'Medicine order delivered — Raj Patel', time:'3 hrs ago', unread:false },
];

export default function Navbar() {
  const { toggle, toggleMobile } = useSidebarStore();
  const { dark, toggle: toggleDark } = useThemeStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const unread = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 lg:px-6
      bg-white/75 dark:bg-[#080d14]/80 backdrop-blur-xl
      border-b border-slate-200/60 dark:border-slate-800/60">

      {/* Hamburger */}
      <motion.button
        whileTap={{ scale: .9 }}
        onClick={() => { toggle(); toggleMobile(); }}
        className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Menu size={20} />
      </motion.button>

      {/* Search bar */}
      <motion.div
        animate={{ width: searchFocused ? '480px' : '320px' }}
        transition={{ duration: .25, ease: [.4,0,.2,1] }}
        className="relative hidden sm:block max-w-lg"
      >
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search users, orders, records…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="input-field pl-10 pr-12 h-9 text-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
            <Command size={9} />K
          </kbd>
        </div>
      </motion.div>

      <div className="flex items-center gap-1.5 ml-auto">
        {/* Dark mode */}
        <motion.button
          whileTap={{ scale: .88, rotate: 15 }}
          onClick={toggleDark}
          className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={dark ? 'sun' : 'moon'}
              initial={{ y: -14, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 14, opacity: 0, rotate: 30 }}
              transition={{ duration: .2 }}
            >
              {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: .88 }}
            onClick={() => setNotifOpen(o => !o)}
            className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell size={18} />
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#080d14]"
              />
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setNotifOpen(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: .95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: .95 }}
                  transition={{ duration: .18 }}
                  className="absolute right-0 top-full mt-2 w-80 z-50 card shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">Notifications</p>
                      {unread > 0 && <span className="badge badge-active">{unread} new</span>}
                    </div>
                    <button onClick={() => setNotifOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                      <X size={14} className="text-slate-400" />
                    </button>
                  </div>
                  {NOTIFICATIONS.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer border-b border-slate-50 dark:border-slate-800/40 last:border-0 ${n.unread ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''}`}
                    >
                      {n.unread && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                      {!n.unread && <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">{n.text}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40">
                    <button className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Mark all as read</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: .95 }}
          className="relative cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white font-display shadow-md"
            style={{ background: 'linear-gradient(135deg,#10b981 0%,#047857 100%)' }}>
            AD
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-[#080d14]" />
        </motion.div>
      </div>
    </header>
  );
}
