export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidUsername(value: string): boolean {
  return /^[A-Za-z0-9._-]{4,32}$/.test(value.trim());
}
