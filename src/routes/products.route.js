const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;