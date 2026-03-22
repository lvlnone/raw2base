type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function IntensitySlider({ value, onChange }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">Intensity</label>
        <span className="text-sm text-zinc-400">{value.toFixed(2)}</span>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />

      <p className="mt-2 text-sm text-zinc-500">
        Lower values are more restrained. Higher values push the tonal shaping harder.
      </p>
    </div>
  );
}