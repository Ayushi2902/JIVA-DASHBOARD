export default function Avatar({ initials, color='bg-emerald-500', size='md', className='' }) {
  const sizes = { sm:'w-8 h-8 text-xs', md:'w-10 h-10 text-sm', lg:'w-14 h-14 text-base', xl:'w-20 h-20 text-xl' };
  return (
    <div className={`${sizes[size]} ${color} rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 font-display ${className}`}>
      {initials}
    </div>
  );
}
