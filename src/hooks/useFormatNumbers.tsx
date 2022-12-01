export default function useFormatNumbers (num: number) {
  const numString: string = num.toString();

  numString.replace(/[^0-9.]/g, '');

  if (num < 1000) {
    return num.toString();
  }

  let si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
  ];
  let index;

  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return num > 99999 ? (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s : num;
}