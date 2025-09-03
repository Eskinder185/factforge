import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-black">404</h2>
      <p className="text-gray-400">We couldn't find that page.</p>
      <Link to="/" className="inline-block mt-4 px-4 py-2 rounded bg-gray-800 border border-gray-700">Back Home</Link>
    </section>
  );
}
