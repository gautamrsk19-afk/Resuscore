import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resumes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const emailEnabled = (process.env.EMAIL_ENABLED || '').toLowerCase() === 'true';
const smtpPassConfigured = Boolean(process.env.SMTP_PASS && process.env.SMTP_PASS.trim());

console.log(`Email delivery: ${emailEnabled ? 'enabled' : 'disabled'} | SMTP pass configured: ${smtpPassConfigured ? 'yes' : 'no'}`);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (_req, res) => {
  res.json({
    name: 'Resuscore API',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.listen(port, () => {
  console.log(`Resuscore API running on http://localhost:${port}`);
});
