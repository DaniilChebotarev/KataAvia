export const transformPrice = (price: number) => {
  return String(price)
    .split('')
    .reverse()
    .map((s, i) => (!((i + 1) % 3) ? ` ${s}` : s))
    .reverse()
    .join('');
};
