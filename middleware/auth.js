import jwt from 'jsonwebtoken';

// JWT authentication middleware
const verifyToken = (req, res, next) => {
  // Accept both lowercase and capitalized headers (some clients send lowercase, some don't)
  const authHeader = req.headers['authorization'] || req.headers.Authorization;
  console.log('🔐 Incoming Auth Header:', authHeader);

  // Check for Bearer token format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No token or malformed header');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verify token using secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('✅ Token verified:', decoded);
    next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default verifyToken;
