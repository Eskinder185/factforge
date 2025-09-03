import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { generateQuestionsFromText } from "../utils/generator";
import { GradientButton } from "../components/GradientButton";
import { SparkDivider } from "../components/SparkDivider";

type Q = { question: string; options: string[]; answer: string };

export default function Forge() {
  const [text, setText] = useState("");
  const [maxQ, setMaxQ] = useState(8);
  const [questions, setQuestions] = useState<Q[]>([]);

  const handleGenerate = () => setQuestions(generateQuestionsFromText(text, maxQ));
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "factforge-questions.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const sample = useMemo(()=>`Alan Turing was a pioneering computer scientist who played a crucial role in breaking the Enigma code during World War II. The Eiffel Tower is a wrought-iron lattice tower in Paris, built in 1889. The Amazon rainforest spans multiple South American countries and is vital for global biodiversity.`, []);

  return (
    <section>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold">Forge questions from text</h2>
          <p className="text-gray-400 mt-1">Paste any text or try the sample below. All generation runs locally in your browser.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-300">
            Max questions:
            <input
              type="number" min={1} max={20} value={maxQ}
              onChange={(e)=>setMaxQ(parseInt(e.target.value||"8",10))}
              className="ml-2 w-20 bg-gray-900 border border-gray-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </label>
          <GradientButton onClick={handleGenerate}>Generate</GradientButton>
          <button
            onClick={handleDownload}
            disabled={!questions.length}
            className="px-4 py-2 rounded glass disabled:opacity-50 hover:bg-gray-800/60"
          >
            Download JSON
          </button>
        </div>
      </div>

      <SparkDivider className="mt-4" />

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <textarea
          className="w-full min-h[220px] p-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder={sample}
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />

        <div className="space-y-3">
          {!questions.length && (
            <div className="p-6 rounded-xl border border-dashed border-gray-700 bg-gray-900 text-gray-400">
              No questions yet — click <span className="text-cyan-300 font-medium">Generate</span> to preview.
            </div>
          )}

          {questions.map((q, idx)=>(
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.03 * idx }}
              className="p-4 rounded-xl border border-gray-800 bg-gray-900"
            >
              <p className="font-semibold text-cyan-300">{q.question}</p>
              <ul className="mt-2 grid sm:grid-cols-2 gap-2">
                {q.options.map((o,i)=>(
                  <li key={i} className="px-2 py-1 rounded bg-gray-800 border border-gray-700">{o}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-2">Answer: <span className="text-gray-200">{q.answer}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
