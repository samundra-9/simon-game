export const playColorSound = (color: string) => {
  const audio = new Audio(new URL(`../sounds/${color}.wav`, import.meta.url).href);
  audio.play().catch(e => console.log('Audio play failed:', e));
};

export const playSuccess = () => {
  const audio = new Audio(new URL('../sounds/success.wav', import.meta.url).href);
  audio.play().catch(e => console.log('Audio play failed:', e));
};

export const playError = () => {
  const audio = new Audio(new URL('../sounds/error.wav', import.meta.url).href);
  audio.play().catch(e => console.log('Audio play failed:', e));
};
