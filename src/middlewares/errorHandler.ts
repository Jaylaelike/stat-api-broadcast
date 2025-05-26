import { Request, Response, NextFunction } from 'express';

export const basicErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction // Though 'next' might not be used in a simple handler, it's good practice to include it
): void => {
  console.error("------------------------------------------------------");
  console.error("An unexpected error occurred:");
  console.error(err.stack); // Log the stack trace for debugging
  console.error("------------------------------------------------------");

  if (res.headersSent) {
    // If headers already sent, delegate to the default Express error handler
    // This is important if an error occurs during streaming, for example
    return next(err); 
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred on the server.",
    // Optionally, include err.message in development environments
    // detail: process.env.NODE_ENV === 'development' ? err.message : undefined, 
  });
};
