import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

interface JwtPayload {
  id: string;
  role: string;
}

// Accept `token` from cookie OR `Authorization: Bearer <token>` header
export const protect = (req: any, res: Response, next: NextFunction) => {
  try {
    const tokenFromCookie = req?.cookies?.token;
    const authHeader = req?.headers?.authorization;
    const tokenFromHeader = authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer')
      ? authHeader.split(' ')[1]
      : undefined;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Attach user info to req (cast to any so TS is happy)
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
