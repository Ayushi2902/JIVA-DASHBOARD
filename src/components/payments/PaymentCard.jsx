import { motion } from 'framer-motion';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';
import { formatDate, formatCurrency, getStatusClass } from '../../utils/helpers.js';

const METHOD_ICONS = { UPI: Smartphone, Card: CreditCard, 'Net Banking': Wallet };
const STATUS_COLORS = { completed:'#10b981', pending:'#f59e0b', failed:'#ef4444' };

export default function PaymentCard({ payment, index }) {
  const Icon = METHOD_ICONS[payment.method] || CreditCard;
  const color = STATUS_COLORS[payment.status] || '#94a3b8';
  return (
    <motion.div
      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:.3, delay: index*.05, ease:[.16,1,.3,1] }}
      whileHover={{ x:2 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f1724] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${color}15` }}>
        <Icon size={17} style={{ color }}/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{payment.title}</span>
          <span className={getStatusClass(payment.status)}>{payment.status.charAt(0).toUpperCase()+payment.status.slice(1)}</span>
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">{payment.description}</p>
        <p className="text-xs text-slate-400 mt-0.5">{formatDate(payment.date)} · {payment.method}</p>
      </div>
      <p className={`font-bold text-sm flex-shrink-0 ${payment.status==='failed'?'text-red-500':'text-slate-800 dark:text-slate-100'}`}>
        {formatCurrency(payment.amount)}
      </p>
    </motion.div>
  );
}
