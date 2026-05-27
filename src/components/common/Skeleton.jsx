export function SkeletonRow() {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className="skeleton w-12 h-12 rounded-2xl flex-shrink-0"/>
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-36 rounded"/>
        <div className="skeleton h-3 w-52 rounded"/>
      </div>
      <div className="hidden md:flex gap-6">
        <div className="skeleton h-4 w-28 rounded"/>
        <div className="skeleton h-4 w-20 rounded"/>
      </div>
    </div>
  );
}
export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <div className="skeleton h-3 w-20 rounded"/>
      <div className="skeleton h-8 w-14 rounded"/>
    </div>
  );
}
export function SkeletonProfile() {
  return (
    <div className="space-y-5">
      <div className="card overflow-hidden">
        <div className="skeleton h-20 rounded-t-2xl rounded-b-none"/>
        <div className="p-6 flex gap-5 items-end -mt-8">
          <div className="skeleton w-20 h-20 rounded-2xl flex-shrink-0"/>
          <div className="flex-1 space-y-2 pb-1">
            <div className="skeleton h-6 w-44 rounded"/>
            <div className="skeleton h-4 w-64 rounded"/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_,i) => <SkeletonCard key={i}/>)}
      </div>
    </div>
  );
}
