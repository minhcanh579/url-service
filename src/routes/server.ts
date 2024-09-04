import { Router, Request, Response, NextFunction } from 'express';
import { getReachableUrls, getReachableUrlsByPriority } from '../services/server';
import { UrlEntry } from '../types/url';
import { ErrorResponse } from '../types/response';

enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

const router = Router();

/**
 * @openapi
 * /servers:
 *   get:
 *     summary: Returns a list of reachable URLs
 *     responses:
 *       200:
 *         description: A list of reachable URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                   priority:
 *                     type: integer
 *     tags:
 *       - Servers
 */
router.get('/servers', 
  async (req: Request, 
    res: Response<UrlEntry[] | ErrorResponse>, next: NextFunction) => {
  try {
    const urls = await getReachableUrls();
    res.status(HttpStatus.OK).json(urls);
  } catch (error) {
    next(error); 
  }
});


/**
 * @openapi
 * /servers/{priority}:
 *   get:
 *     summary: Returns a list of reachable URLs by priority
 *     parameters:
 *       - in: path
 *         name: priority
 *         required: true
 *         description: The priority number to filter URLs by
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of reachable URLs for the specified priority
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *     tags:
 *       - Servers
 */
router.get('/servers/:priority', 
  async (req: Request<{ priority: string }>, 
    res: Response<string[] | ErrorResponse>, next: NextFunction) => {
  const priority = parseInt(req.params.priority, 10);

  if (isNaN(priority)) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid priority' });
  }

  try {
    const urls = await getReachableUrlsByPriority(priority);
    res.status(HttpStatus.OK).json(urls);
  } catch (error) {
    next(error);
  }
});

export default router;