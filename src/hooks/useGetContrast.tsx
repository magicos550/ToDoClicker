export default function useGetContrast (hc: string): boolean {
  const [r, g, b] = hc.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));
  return ((r * 299) + (g * 587) + (b * 114)) / 1000 >= 128;
}