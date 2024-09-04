import { Request, Response, NextFunction } from 'express';
import { Error } from '../types/response';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}