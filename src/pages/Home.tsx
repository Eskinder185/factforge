import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SparkDivider } from "../components/SparkDivider";
import { GradientButton } from "../components/GradientButton";

export default function Home() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
        className="rounded-2xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg"
      >
        <h1 className="text-4xl font-black tracking-tight gradient-text">
          Forge quizzes from any text.
        </h1>
        <p className="mt-3 text-gray-300">
          No login. No ads. Offline-friendly. Education <span className="text-gray-400">+</span> entertainment.
        </p>

        <SparkDivider className="mt-6" />

        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/forge">
            <GradientButton>Start Forging</GradientButton>
          </Link>
          <Link to="/play">
            <button className="px-4 py-2 rounded glass hover:bg-gray-800/60">
              Play Offline
            </button>
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          {title:"Free & Open", desc:"No login. No paywalls. 100% client-side."},
          {title:"Education + Fun", desc:"Great for classrooms, teams, and parties alike."},
          {title:"Offline-Friendly", desc:"Export JSON; load and play without internet."},
        ].map((f,i)=>(
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.3 }}
            className="p-4 rounded-xl border border-gray-800 bg-gray-900 hover:border-cyan-500/40"
          >
            <h3 className="font-semibold text-cyan-300">{f.title}</h3>
            <p className="text-gray-300 mt-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
