function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .replace(/\.(?=[A-Z])/g, ". ")
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.length >= 40 && s.length <= 240);
}

function extractEntities(sentence: string): string[] {
  const entities: string[] = [];
  const caps = sentence.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})\b/g) || [];
  caps.forEach(c => {
    if (!["The","A","An","In","On","At","And","Of","For","To","By","From","With"].includes(c)) entities.push(c.trim());
  });
  const years = sentence.match(/\b(1[5-9]\d{2}|20\d{2})\b/g) || [];
  entities.push(...years);
  return Array.from(new Set(entities)).slice(0, 8);
}

function keywords(sentence: string): string[] {
  const stop = new Set("a,an,the,and,or,but,if,then,else,when,of,for,to,by,from,with,as,is,are,was,were,be,been,being,that,which,who,whom,whose,into,onto,over,under,on,in,at,this,those,these,it,its,their,his,her,our,your,they,we,you,i,not,no,yes,do,does,did,so,such,than,too,very,can,could,should,would,may,might,will,shall,about,between,within,without,across,per,via".split(","));
  return sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w && !stop.has(w) && w.length > 2);
}

function pick<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (copy.length && out.length < n) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i,1)[0]);
  }
  return out;
}

function buildQuestionFromSentence(s: string, globalEntities: string[], globalKeywords: string[]) {
  const ents = extractEntities(s);
  const keys = keywords(s);
  let answer: string | undefined = ents[0] || keys[0];
  if (!answer) return null;

  let q = "";
  if (/(\b(?:in|at|from|to)\b).*(\b[A-Z][a-z]+)/.test(s) && ents.length) {
    q = `Where does this refer to: "${s.trim()}"?`;
  } else if (/\b(19|20)\d{2}\b/.test(s)) {
    q = `When did this occur: "${s.trim()}"?`;
    answer = (s.match(/\b(19|20)\d{2}\b/) || [])[0] || answer;
  } else if (/^[A-Z][a-z]+/.test(answer)) {
    q = `Who or what is referenced here: "${s.trim()}"?`;
  } else {
    q = `What is the missing key fact from: "${s.trim()}"?`;
  }

  const distractorPool = Array.from(new Set([
    ...globalEntities.filter(e => e !== answer),
    ...globalKeywords.filter(k => k !== answer && k.length <= 14)
  ]));
  const distractors = pick(distractorPool, 6)
    .filter(d => d && d.toString().toLowerCase() !== answer!.toLowerCase())
    .slice(0,3);

  while (distractors.length < 3) distractors.push("None of the above");

  const options = [...distractors, answer!];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { question: q, options, answer: answer! };
}

export function generateQuestionsFromText(text: string, maxQ = 8) {
  const sentences = splitSentences(text);
  const globalEntities = Array.from(new Set(sentences.flatMap(extractEntities)));
  const globalKeywords = Array.from(new Set(sentences.flatMap(keywords)));
  const questions = [];
  for (const s of sentences) {
    const q = buildQuestionFromSentence(s, globalEntities, globalKeywords);
    if (q) questions.push(q);
    if (questions.length >= maxQ) break;
  }
  return questions;
}
