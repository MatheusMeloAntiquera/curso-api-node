import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';

export default function (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error: ' + error.message,
  });
}
