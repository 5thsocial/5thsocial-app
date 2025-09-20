import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../configurations/jwtConfig';

export function generateToken(user: any) {
  const payload = {
    userId: user._id,
    email: user.email,
    name: user.name,
  };

  const secretKey = jwtConfig.secretKey;
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY environment variable is not defined');
  }

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}