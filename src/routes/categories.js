const { Router } = require('express');
const categoriesController = require('../controllers/productsController');

const router = Router();

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', categoriesController.create);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

module.exports = router;