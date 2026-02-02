// import { Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import env from "../config/env";

// interface JwtPayload {
//   id: string;
//   role: string;
// }

// // Accept `token` from cookie OR `Authorization: Bearer <token>` header
// export const protect = (req: any, res: Response, next: NextFunction) => {
//   try {
//     // Temporary logs to debug 401 issues
//     console.log("protect middleware - cookies:", req?.cookies);
//     console.log("protect middleware - auth header:", req?.headers?.authorization);
//     const tokenFromCookie = req?.cookies?.token;
//     const authHeader = req?.headers?.authorization;
//     const tokenFromHeader = authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer')
//       ? authHeader.split(' ')[1]
//       : undefined;

//     const token = tokenFromCookie || tokenFromHeader;

//     console.log("protect middleware - token chosen:", token);

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

//     // Attach user info to req (cast to any so TS is happy)
//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//     };

//     next();
//   } catch (error: any) {
//     console.error("JWT verify error:", error);
//     res.status(401).json({ message: "Not authorized, token failed", error: error?.message || String(error) });
//   }
// };


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token = req.cookies.token;

  if (!token) {
    // 🟢 Instead of 401, we just move to the next function.
    // The controller will then decide what to do.
    return next(); 
  }

  try {
    const decoded: any = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // Contains id and role
    next();
  } catch (error) {
    // If token is invalid/expired, clear it and move on
    res.clearCookie("token");
    next();
  }
};