import { motion } from 'framer-motion';
import { Phone, Calendar, Pencil, Trash2, Heart } from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import { formatDate } from '../../utils/helpers.js';

const RELATION_COLORS = {
  Father:'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  Mother:'bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-400',
  Son:'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Daughter:'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400',
  Husband:'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400',
  Wife:'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400',
};

export default function FamilyMemberCard({ member, index, onEdit, onDelete }) {
  const relClass = RELATION_COLORS[member.relation] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  return (
    <motion.div
      initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:.3, delay: index*.05, ease:[.16,1,.3,1] }}
      whileHover={{ x:2 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f1724] hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200 group"
    >
      <Avatar initials={member.avatar} color={member.color} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{member.name}</p>
          <span className={`badge ${relClass}`}><Heart size={9}/>{member.relation}</span>
        </div>
        <div className="flex items-center gap-4 mt-1.5">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><Phone size={10}/>{member.phone}</span>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><Calendar size={10}/>{formatDate(member.dob)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {onEdit && <button onClick={() => onEdit(member)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"><Pencil size={13}/></button>}
        {onDelete && <button onClick={() => onDelete(member.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"><Trash2 size={13}/></button>}
      </div>
    </motion.div>
  );
}
