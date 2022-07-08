const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

module.exports = usersRouter;