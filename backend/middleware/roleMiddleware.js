// middleware/roleMiddleware.js
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(`Role '${req.user ? req.user.role : "unauthenticated"}' is not authorized to access this route`)
      );
    }
    next();
  };
};

module.exports = { authorize };