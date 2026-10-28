import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword, normalizeEmail } from './auth.js';

test('normalizeEmail trims and lowercases addresses', () => {
  assert.equal(normalizeEmail('  User@Example.com  '), 'user@example.com');
});

test('hashPassword generates a deterministic hash format and verifies correctly', async () => {
  const input = 'P@ssw0rd!';
  const hash = await hashPassword(input);

  assert.ok(hash.startsWith('pbkdf2$'));
  assert.equal(await verifyPassword(input, hash), true);
  assert.equal(await verifyPassword('wrong-password', hash), false);
});
