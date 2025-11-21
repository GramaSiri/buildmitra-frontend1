import express from 'express';
import {
  createProject,
  getProjects,
  exitProjectFlow,
  updateBoqItem
} from '../controllers/projectController.js';

import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ These paths are relative to /api/projects
router.post('/', verifyToken, createProject); // POST /api/projects
router.get('/', verifyToken, getProjects);    // GET /api/projects
router.get('/exit', verifyToken, exitProjectFlow); // GET /api/projects/exit
router.patch('/:projectId/boq/:boqIndex', verifyToken, updateBoqItem); // PATCH /api/projects/:projectId/boq/:boqIndex

export default router;
