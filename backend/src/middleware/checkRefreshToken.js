import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  // Verify refresh token
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
    req.userId = decoded.id; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
