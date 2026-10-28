import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { hashPassword, normalizeEmail, verifyPassword } from '../lib/auth.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? normalizeEmail(req.body.email) : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with that email already exists.' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash: await hashPassword(password),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Signup failed:', error);
    return res.status(500).json({
      message: 'User registration failed.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.post('/login', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? normalizeEmail(req.body.email) : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        createdAt: true,
      },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordMatches = await verifyPassword(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;

    return res.json({ success: true, user: safeUser });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({
      message: 'Authentication failed.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
