export default function FAQ() {
  return (
    <section className="prose prose-invert max-w-none">
      <h2>FAQ</h2>
      <h3>Do I need an account?</h3>
      <p>No. FactForge is fully client-side — no login, no data collection.</p>
      <h3>Is it free?</h3>
      <p>Yes. There are no ads or paywalls. The generator runs in your browser.</p>
      <h3>Can I use it offline?</h3>
      <p>Yes. Generate questions, download JSON, and load it later in the Play tab without internet.</p>
      <h3>How are questions generated?</h3>
      <p>Phase 1 uses a rule-based extractor (keywords & entities). An optional AI mode can be added later.</p>
      <h3>Will you add multiplayer?</h3>
      <p>Possibly! The architecture is expandable (APIs / WebSockets) while keeping the core free and local.</p>
    </section>
  );
}
