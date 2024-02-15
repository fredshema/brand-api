import { Router } from 'express';
import { authenticate } from '../controllers/auth';

const authRoutes = Router();

authRoutes.post('/login', authenticate);

export { authRoutes };
