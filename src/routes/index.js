import express from 'express';
import authRouter from './authRouter.js';
import fileRouter from './fileRouter.js';
import fileEjemploRouter from './fileEjemploRouter.js';
import { asyncHandler } from '../middleware/handler.js';
import folderRouter from './folderRouter.js';

const router = express.Router();
// Rutas de autenticación con prefijo '/api/v1/auth'
router.use('/api/v1/auth', asyncHandler(authRouter));

// Rutas de archivos con prefijo '/api/v1/files'
router.use('/api/v1/files', asyncHandler(fileRouter));

// Rutas de Folder con prefijo '/api/v1/folder'
router.use('/api/v1/folder', asyncHandler(folderRouter));

// Rutas de archivos de ejemplo con prefijo '/api/v1/file-ejemplo'
router.use('/api/v1/file-ejemplo', asyncHandler(fileEjemploRouter));



export default router;