import React from 'react';

export function Card({ title, eyebrow, children }: React.PropsWithChildren<{ title: string; eyebrow?: string }>) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p> : null}
      <h2 className="mt-2 text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 text-sm text-slate-200">{children}</div>
    </section>
  );
}

export function Metric({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${accent ?? 'text-white'}`}>{value}</p>
    </div>
  );
}
