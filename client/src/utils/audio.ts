const NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

const hashSeed = (seedStr: string): number => {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const playGeneratedMelody = (seed: string) => {
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioContextClass();
  const baseHash = hashSeed(seed);

  const sequence: number[] = [];
  for (let i = 0; i < 6; i++) {
    const noteIndex = (baseHash + i * 13) % NOTES.length;
    sequence.push(NOTES[noteIndex]);
  }

  const noteDuration = 0.25;

  sequence.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const waveTypes: OscillatorType[] = ['sine', 'triangle', 'square'];
    osc.type = waveTypes[baseHash % waveTypes.length];
    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * noteDuration);

    gain.gain.setValueAtTime(0.15, ctx.currentTime + index * noteDuration);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (index + 1) * noteDuration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + index * noteDuration);
    osc.stop(ctx.currentTime + (index + 1) * noteDuration);
  });
};