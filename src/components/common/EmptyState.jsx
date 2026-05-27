import { motion } from 'framer-motion';

export default function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
      className="flex flex-col items-center justify-center py-14 text-center"
    >
      <motion.div
        initial={{ scale:.8 }} animate={{ scale:1 }}
        transition={{ delay:.1, type:'spring', stiffness:200 }}
        className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4"
      >
        {icon}
      </motion.div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</p>
      {description && <p className="text-xs text-slate-400 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
