const { Router } = require('express');
const requestsController = require('../controllers/requestsController');

const requestsRouter = Router();

requestsRouter.get('/', requestsController);

module.exports = requestsRouter;