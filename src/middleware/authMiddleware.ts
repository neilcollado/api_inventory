import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthRequest extends Request {
  user?: {
    userId: number,
    email?: string,
    name?: string,
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number; email?: string; name?: string };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
