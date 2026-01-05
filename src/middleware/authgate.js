// Auth Gate Middleware
// Check session token in Authorization header
// Check and validate to database

const prisma = require("../prisma/client");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authGate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT token first
    jwt.verify(token, process.env.JWT_SECRET);

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (session.expiresAt < new Date()) {
      return res.status(401).json({ message: "Expired token" });
    }

    req.user = session.user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    
    console.error("AuthGate error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = authGate;