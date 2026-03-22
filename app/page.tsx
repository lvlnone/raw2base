import Header from "@/components/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
            Raw2Base MVP
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Start every vocal from a better base.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Upload a dry vocal stem and get a cleaner, more balanced starting
            point in seconds. Not auto-mixing. Not fake mastering. Just a
            strong base to build from.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/upload"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
            >
              Try the MVP
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-zinc-700 px-5 py-3 font-medium text-zinc-100 transition hover:bg-zinc-900"
            >
              View pricing
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold">Clean up the lows</h2>
            <p className="mt-3 text-zinc-400">
              Gently removes rumble and low-end mud so the vocal sits better.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold">Add controlled presence</h2>
            <p className="mt-3 text-zinc-400">
              Subtle shaping in the mids and highs for a more usable starting
              tone.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="text-xl font-semibold">Keep your voice yours</h2>
            <p className="mt-3 text-zinc-400">
              Raw2Base is not trying to finish the mix for you. It just gets
              you into a better place faster.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}