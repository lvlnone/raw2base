type Props = {
  src: string | null;
};

export default function AudioPlayer({ src }: Props) {
  if (!src) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 px-4 py-8 text-sm text-zinc-500">
        No audio loaded yet.
      </div>
    );
  }

  return <audio controls className="w-full" src={src} />;
}