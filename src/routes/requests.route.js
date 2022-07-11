const { Router } = require('express');
const requestsController = require('../controllers/requestsController');

const requestsRouter = Router();

requestsRouter.get('/', requestsController.getAll);
requestsRouter.get('/:id', requestsController.getById);
requestsRouter.post('/', requestsController.create);
requestsRouter.put('/:id', requestsController.update);
requestsRouter.delete('/:id', requestsController.delete);

module.exports = requestsRouter;