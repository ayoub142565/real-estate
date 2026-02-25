export default function LoadingSkeleton({ cards = 6 }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white p-3 shadow-card">
          <div className="h-40 rounded-xl bg-slate-200" />
          <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
