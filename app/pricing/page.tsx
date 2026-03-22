import Header from "@/components/Header";
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <Header />
      
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="mt-3 text-zinc-400">
          Start free, then upgrade when the sound is right.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
            <p className="text-sm uppercase tracking-wide text-zinc-500">Free</p>
            <h2 className="mt-2 text-3xl font-bold">$0</h2>
            <ul className="mt-6 space-y-3 text-zinc-300">
              <li>3 free exports</li>
              <li>Balanced Base chain</li>
              <li>Intensity slider</li>
              <li>WAV export</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-zinc-700 bg-white p-8 text-black">
            <p className="text-sm uppercase tracking-wide text-zinc-600">Starter Pack</p>
            <h2 className="mt-2 text-3xl font-bold">$7</h2>
            <ul className="mt-6 space-y-3 text-zinc-800">
              <li>25 exports</li>
              <li>Future preset access</li>
              <li>Best for early users</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}