export function buildFilterChain(intensity: number) {
  const i = Math.min(1, Math.max(0, intensity));

  const mudCut = -(1.5 + i * 2.0);
  const lowMidCut = -(0.5 + i * 1.2);
  const presenceBoost = 1.2 + i * 2.0;
  const airBoost = 1.5 + i * 2.5;
  const compThreshold = 0.17 - i * 0.05;
  const compRatio = 2.4 + i * 0.8;

  return [
    "highpass=f=90",
    `equalizer=f=250:t=q:w=1:g=${mudCut.toFixed(2)}`,
    `equalizer=f=550:t=q:w=1:g=${lowMidCut.toFixed(2)}`,
    `equalizer=f=3200:t=q:w=1:g=${presenceBoost.toFixed(2)}`,
    `treble=g=${airBoost.toFixed(2)}`,
    `acompressor=threshold=${compThreshold.toFixed(3)}:ratio=${compRatio.toFixed(2)}:attack=15:release=75:makeup=1`,
    "alimiter=limit=0.95"
  ].join(",");
}