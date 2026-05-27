import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, ChevronDown } from 'lucide-react';
import { formatDate, formatCurrency, getStatusClass } from '../../utils/helpers.js';

const STATUS_COLORS = { delivered:'#10b981', pending:'#f59e0b', cancelled:'#ef4444' };
const STATUS_OPTIONS = ['pending','delivered','cancelled'];

export default function OrderCard({ order, index, onStatusChange, onDelete }) {
  const color = STATUS_COLORS[order.status] || '#94a3b8';
  return (
    <motion.div
      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:.3, delay: index*.05, ease:[.16,1,.3,1] }}
      whileHover={{ x:2 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f1724] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${color}15` }}>
        <ShoppingBag size={17} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{order.title}</span>
          <span className={getStatusClass(order.status)}>{order.status.charAt(0).toUpperCase()+order.status.slice(1)}</span>
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">{order.description}</p>
        <p className="text-xs text-slate-400 mt-0.5">{formatDate(order.date)} · <span className="font-semibold text-slate-600 dark:text-slate-300">{formatCurrency(order.amount)}</span></p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onStatusChange && (
          <div className="relative">
            <select value={order.status} onChange={e => onStatusChange(order.id, e.target.value)}
              className="appearance-none text-xs border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-6 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer">
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
          </div>
        )}
        {onDelete && (
          <button onClick={() => onDelete(order.id)} className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100">
            <Trash2 size={14}/>
          </button>
        )}
      </div>
    </motion.div>
  );
}
