const { Router } = require('express');
const adressController = require('../controllers/adressController');

const adressRouter = Router();

adressRouter.get('/', adressController);

module.exports = adressRouter;