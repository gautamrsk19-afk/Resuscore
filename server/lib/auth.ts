import crypto from 'node:crypto';

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512');
  return `pbkdf2$${salt}$${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash || !storedHash.startsWith('pbkdf2$')) {
    return false;
  }

  const [, salt, hash] = storedHash.split('$');

  if (!salt || !hash) {
    return false;
  }

  try {
    const derivedKey = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedKey, 'hex'));
  } catch {
    return false;
  }
}
