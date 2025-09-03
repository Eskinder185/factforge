export default function Principles() {
  const items = [
    {title:"No Onboarding Headaches", desc:"Open access — paste text and go. No accounts, no email walls."},
    {title:"Education + Fun", desc:"Designed for classrooms, teams, and parties — not either/or."},
    {title:"No Ads / No Paywalls", desc:"Clean experience. No trackers. 100% client-side."},
    {title:"Modern UI/UX", desc:"Responsive, keyboard-friendly, and accessible by default."},
    {title:"Offline-First", desc:"Export JSON, play offline. Optional PWA cache for reliability."},
    {title:"Anti-Cheat Signals", desc:"Timer + focus-loss indicator to encourage honest play."}
  ];
  return (
    <section>
      <h2 className="text-2xl font-bold">Why Free? Our Principles</h2>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {items.map((it,i)=>(
          <div key={i} className="p-4 rounded-xl border border-gray-800 bg-gray-900">
            <h3 className="font-semibold text-cyan-300">{it.title}</h3>
            <p className="text-gray-300 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
