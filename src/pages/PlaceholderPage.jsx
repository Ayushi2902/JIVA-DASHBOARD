import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react';

export default function PlaceholderPage({ title = 'Coming Soon' }) {
  return (
    <motion.div
      initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
      className="flex flex-col items-center justify-center h-64"
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
        transition={{ duration: 1.2, delay: .3, ease: 'easeInOut' }}
        className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5"
      >
        <Hammer size={26} className="text-slate-400"/>
      </motion.div>
      <h2 className="text-lg font-display font-semibold text-slate-700 dark:text-slate-300">{title}</h2>
      <p className="text-sm text-slate-400 mt-1">This section is coming soon.</p>
    </motion.div>
  );
}
