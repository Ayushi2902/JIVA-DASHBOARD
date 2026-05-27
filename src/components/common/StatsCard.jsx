import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isNum = !isNaN(Number(value));

  useEffect(() => {
    if (!isNum || !ref.current) return;
    const controls = animate(0, Number(value), {
      duration: 1.2,
      ease: [.16, 1, .3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
      },
    });
    return controls.stop;
  }, [value]);

  if (!isNum) return <span>{value}</span>;
  return <span ref={ref}>0</span>;
}

export default function StatsCard({ label, value, icon, iconBg, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: .97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: .5, delay, ease: [.16,1,.3,1] }}
      whileHover={{ y: -3, transition: { duration: .2 } }}
      className="relative card card-lift overflow-hidden cursor-default"
    >
      {/* Gradient accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: gradient || 'linear-gradient(90deg,#10b981,#059669)' }} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-display font-bold text-slate-900 dark:text-white leading-none">
              <AnimatedNumber value={value} />
            </p>
          </div>
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: .4 }}
            className={`w-11 h-11 ${iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}
          >
            {icon}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
