export default function GlassPage({ title, children, actions }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-2">{actions}</div>
      </div>
      <div className="mt-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        {children}
      </div>
    </div>
  )
}
