"use client";
import ABPlayer from "@/components/ABPlayer";
import Header from "@/components/Header";

import { useMemo, useState } from "react";
import IntensitySlider from "@/components/IntensitySlider";
import AudioPlayer from "@/components/AudioPlayer";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [intensity, setIntensity] = useState(0.5);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [rawUrl, setRawUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileLabel = useMemo(() => {
    if (!file) return "No file selected";
    return `${file.name} (${Math.round(file.size / 1024)} KB)`;
  }, [file]);

  function handleFileChange(selected: File | null) {
    setFile(selected);
    setProcessedUrl(null);
    setError(null);

    if (selected) {
      const localUrl = URL.createObjectURL(selected);
      setRawUrl(localUrl);
    } else {
      setRawUrl(null);
    }
  }

  async function handleProcess() {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setProcessedUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("intensity", String(intensity));

      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Processing failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <Header />
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Upload a vocal</h1>
          <p className="mt-3 text-zinc-400">
            WAV, MP3, AIFF, or AIF. Best results come from dry vocal stems.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
          <label className="block">
            <span className="mb-3 block text-sm font-medium text-zinc-300">
              Vocal file
            </span>

            <input
              type="file"
              accept=".wav,.mp3,.aiff,.aif,audio/wav,audio/mpeg,audio/aiff"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              className="block w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
            />
          </label>

          <p className="mt-3 text-sm text-zinc-500">{fileLabel}</p>

          <div className="mt-8">
            <IntensitySlider value={intensity} onChange={setIntensity} />
          </div>

          <button
            onClick={handleProcess}
            disabled={!file || isLoading}
            className="mt-8 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Process vocal"}
          </button>

          {error && (
            <p className="mt-4 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="mb-4 text-xl font-semibold">Raw preview</h2>
            <AudioPlayer src={rawUrl} />
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="mb-4 text-xl font-semibold">Processed preview</h2>
            <AudioPlayer src={processedUrl} />

            {processedUrl && (
              <a
                href={processedUrl}
                download="raw2base-output.wav"
                className="mt-5 inline-block rounded-2xl border border-zinc-700 px-4 py-3 text-sm font-medium hover:bg-zinc-800"
              >
                Download processed file
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}