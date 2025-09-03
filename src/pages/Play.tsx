import { useEffect, useRef, useState } from "react";

type Q = { question: string; options: string[]; answer: string };

function useAntiCheat() {
  const [blurs, setBlurs] = useState(0);
  useEffect(() => {
    const onBlur = () => setBlurs(b => b + 1);
    const onHidden = () => { if (document.hidden) setBlurs(b => b + 1); };
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, []);
  return blurs;
}

export default function Play() {
  const [qs, setQs] = useState<Q[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const timerRef = useRef<number | null>(null);
  const blurs = useAntiCheat();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (Array.isArray(data)) setQs(data);
        setI(0); setScore(0); setTime(20);
      } catch {}
    };
    reader.readAsText(file);
  };

  useEffect(()=>{
    if (!qs.length) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    setTime(20);
    timerRef.current = window.setInterval(()=>{
      setTime(t => {
        if (t <= 1) {
          window.clearInterval(timerRef.current!);
          setI(x => Math.min(x + 1, qs.length - 1));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [i, qs.length]);

  const current = qs[i];

  const choose = (opt: string) => {
    if (!current) return;
    if (opt === current.answer) setScore(s => s + 1);
    setI(x => Math.min(x + 1, qs.length - 1));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold">Offline Play</h2>
      <p className="text-gray-400">Load a questions JSON and play locally (no internet required).</p>

      <div className="mt-3">
        <input type="file" accept="application/json" onChange={onFile} />
      </div>

      {qs.length > 0 && (
        <div className="mt-6 p-4 rounded-xl border border-gray-800 bg-gray-900">
          <div className="flex items-center justify-between">
            <div>Question {i+1}/{qs.length} • Score: <span className="text-brand-cyan font-semibold">{score}</span></div>
            <div>Time: <span className={`font-bold ${time <= 5 ? "text-red-400" : "text-brand-cyan"}`}>{time}s</span></div>
          </div>
          <p className="mt-3 font-semibold text-brand-cyan">{current?.question}</p>
          <div className="grid sm:grid-cols-2 gap-2 mt-3">
            {current?.options.map((o, idx)=>(
              <button key={idx} className="px-3 py-2 rounded bg-gray-800 border border-gray-700 hover:border-brand-cyan text-left" onClick={()=>choose(o)}>{o}</button>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-3">
            Anti-cheat signal: focus lost <span className="text-gray-200">{blurs}</span> time(s).
          </div>
        </div>
      )}
    </section>
  );
}
