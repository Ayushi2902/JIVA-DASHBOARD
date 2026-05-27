import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, subtitle, children, size = 'md' }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  const sizes = { sm:'max-w-md', md:'max-w-2xl', lg:'max-w-3xl' };
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity:0, scale:.94, y:16 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:.94, y:16 }}
            transition={{ duration:.25, ease:[.16,1,.3,1] }}
            className={`relative w-full ${sizes[size]} bg-white dark:bg-[#0f1724] rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden`}
            style={{ boxShadow:'0 32px 64px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.1)' }}
          >
            {/* Header accent */}
            <div className="h-[2px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 rounded-t-2xl" />
            <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-display font-semibold text-slate-900 dark:text-white">{title}</h2>
                {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
              </div>
              <motion.button
                whileHover={{ scale:1.1, rotate:90 }} whileTap={{ scale:.9 }}
                transition={{ duration:.15 }}
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mt-0.5"
              >
                <X size={16} className="text-slate-400"/>
              </motion.button>
            </div>
            <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
