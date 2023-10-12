const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // If there are no validation errors, continue to the next middleware.
  next();
};
module.exports = validatorMiddleware;
