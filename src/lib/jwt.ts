import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRATION = '7d'; // 7 days as requested

// Create secret key for jose (Edge Runtime compatible)
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export const signToken = async (payload: JWTPayload): Promise<string> => {
  const secret = getSecretKey();
  const token = await new jose.SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(secret);
  return token;
};

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    console.log('🔐 [JWT] Verifying token with jose (Edge Runtime compatible)...');
    const secret = getSecretKey();
    const { payload } = await jose.jwtVerify(token, secret);
    console.log('✅ [JWT] Token verified successfully:', payload);
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error('❌ [JWT] Token verification failed:', error instanceof Error ? error.message : error);
    return null;
  }
};

// Synchronous version for middleware (Edge Runtime)
export const verifyTokenSync = async (token: string): Promise<JWTPayload | null> => {
  return verifyToken(token);
};

export const generateRefreshToken = async (payload: JWTPayload): Promise<string> => {
  const secret = getSecretKey();
  const token = await new jose.SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // Refresh token valid for 30 days
    .sign(secret);
  return token;
};
