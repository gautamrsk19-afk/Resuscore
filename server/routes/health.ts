import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      message: 'Database not reachable yet. Make sure PostgreSQL is running and DATABASE_URL is configured.',
      error: error instanceof Error ? error.message : 'Unknown database error',
    });
  }
});

export default router;
