import express from 'express';
import authRouter from './authRouter.js';
import fileRouter from './fileRouter.js';
import fileEjemploRouter from './fileEjemploRouter.js';

const router = express.Router();

// Rutas de autenticación con prefijo '/api/v1/auth'
router.use('/api/v1/auth', authRouter);

// Rutas de archivos con prefijo '/api/v1/files'
router.use('/api/v1/files', fileRouter);

// Rutas de archivos de ejemplo con prefijo '/api/v1/file-ejemplo'
router.use('/api/v1/file-ejemplo', fileEjemploRouter);

export default router;