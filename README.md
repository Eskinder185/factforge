# FactForge

**Forge quizzes from any text — free, offline, no login.**  
Live demo → **https://eskinder185.github.io/factforge/**

## ✨ Features
- 100% client-side (no ads, no tracking)
- Rule-based question generator (no paid APIs)
- Offline play (export/import JSON)
- Modern UI (React + Tailwind + motion)
- Light anti-cheat (timer + focus-loss)

## 🚀 Quick Start
```bash
git clone https://github.com/Eskinder185/factforge.git
cd factforge
npm install
npm run dev
🧠 How It Works
Parses your text → finds entities/keywords → builds multiple-choice questions.

Everything runs in the browser (see src/utils/generator.ts).

🌐 Deploy (GitHub Pages)
bash
Copy code
npm run build
npm run deploy
Then in GitHub: Settings → Pages → Branch = gh-pages.

If you rename the repo, update vite.config.ts (base) and package.json (homepage).

📁 Structure
bash
Copy code
src/
  pages/ (Home, Forge, Play, FAQ, Principles)
  components/ (GradientButton, SparkDivider)
  utils/generator.ts
  styles/globals.css
