const MOROCCAN_MOBILE_PATTERNS = [
  /^0[67]\d{8}$/,
  /^\+212[67]\d{8}$/,
  /^00212[67]\d{8}$/,
  /^212[67]\d{8}$/,
];

export function cleanPhone(raw: string): string {
  return raw.replace(/[\s.\-()]/g, "");
}

export function isValidMoroccanPhone(raw: string): boolean {
  const cleaned = cleanPhone(raw);
  return MOROCCAN_MOBILE_PATTERNS.some((pattern) => pattern.test(cleaned));
}

export function normalizeMoroccanPhone(raw: string): string {
  const cleaned = cleanPhone(raw);
  if (cleaned.startsWith("+212")) return cleaned;
  if (cleaned.startsWith("00212")) return `+212${cleaned.slice(5)}`;
  if (cleaned.startsWith("212")) return `+212${cleaned.slice(3)}`;
  if (cleaned.startsWith("0")) return `+212${cleaned.slice(1)}`;
  return cleaned;
}
