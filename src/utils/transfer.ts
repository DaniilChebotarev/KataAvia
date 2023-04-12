export function numberOfTransfer(arr: string[]): string | undefined {
  if (arr.length === 0) return `${arr.length} ПЕРЕСАДОК`;
  if (arr.length === 1) return `${arr.length} ПЕРЕСАДКА`;
  if (arr.length >= 2) return `${arr.length} ПЕРЕСАДКИ`;
}
