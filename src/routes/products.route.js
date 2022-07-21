const { Router } = require('express');
const productsController = require('../controllers/productsController');
const loginController = require('../controllers/loginController');

const productsRouter = Router();

productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

productsRouter.use(loginController.validateToken);
productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);

module.exports = productsRouter;