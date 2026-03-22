"use client";

import { useState } from "react";

type Props = {
  rawSrc: string | null;
  processedSrc: string | null;
};

export default function ABPlayer({ rawSrc, processedSrc }: Props) {
  const [mode, setMode] = useState<"raw" | "processed">("raw");

  const activeSrc = mode === "raw" ? rawSrc : processedSrc;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setMode("raw")}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            mode === "raw"
              ? "bg-white text-black"
              : "border border-zinc-700 text-zinc-300"
          }`}
        >
          A: Raw
        </button>

        <button
          onClick={() => setMode("processed")}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            mode === "processed"
              ? "bg-white text-black"
              : "border border-zinc-700 text-zinc-300"
          }`}
        >
          B: Processed
        </button>
      </div>

      {!activeSrc ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 px-4 py-8 text-sm text-zinc-500">
          Load audio to compare.
        </div>
      ) : (
        <audio controls className="w-full" src={activeSrc} />
      )}
    </div>
  );
}