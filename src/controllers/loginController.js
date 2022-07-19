const loginService = require('../services/loginService');

const loginController = {
  create: async (req, res) => {
    const body = loginService.validateBody(req.body);
    const token = await loginService.create(body);
    res.status(200).json({ token });
  },

  validateToken: async (req, _res, next) => {
    const { authorization } = req.headers;
    const user = loginService.validateToken(authorization);
    req.user = user;
    next();
  },
};

module.exports = loginController;