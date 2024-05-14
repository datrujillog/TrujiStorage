import express from 'express';

import { asyncHandler } from '../middleware/handler.js';

import authRouter from './authRouter.js';
import fileRouter from './fileRouter.js';
import fileEjemploRouter from './fileEjemploRouter.js';
import folderRouter from './folderRouter.js';
import subscriptionRouter from './subscriptionRouter.js';
import webhooksRouter from './webhooksRouter.js';

const router = express.Router();
// Rutas de autenticación con prefijo '/api/v1/auth'
router.use('/api/v1/auth', asyncHandler(authRouter));

// Rutas de archivos con prefijo '/api/v1/files'
router.use('/api/v1/files', asyncHandler(fileRouter));

// Rutas de Folder con prefijo '/api/v1/folder'
router.use('/api/v1/folder', asyncHandler(folderRouter));

// Rutas de archivos de ejemplo con prefijo '/api/v1/file-ejemplo'
router.use('/api/v1/file-ejemplo', asyncHandler(fileEjemploRouter));

//Rutas de Subscription con prefijo '/api/v1/subscription'
router.use('/api/v1/subscriptions', asyncHandler(subscriptionRouter));

// Rutas de WebhooksRouter con prefijo '/api/v1/webhooks'
router.use('/api/v1/webhooks', asyncHandler(webhooksRouter));



export default router;