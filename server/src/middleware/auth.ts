import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const authenticateJwt = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authorization token required' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'sri_kannathal_homecare_secret_key_2026_jwt_token_secure_98765';

  try {
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired authentication token' });
    return;
  }
};
