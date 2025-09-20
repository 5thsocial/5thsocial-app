import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configurations/jwtConfig';

@Injectable()
export class AuthGuard implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized, missing token!" });
    }
    
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized, invalid token format!" });
    }

    const secretKey = jwtConfig.secretKey;
    if (!secretKey) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden, invalid token!" });
      }
      req['user'] = user;
      next();
    });
  }
}