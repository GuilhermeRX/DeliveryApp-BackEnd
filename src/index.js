const express = require('express');
require('dotenv').config();
const adressRouter = require('./routes/adress.route');
const productsRouter = require('./routes/products.route');
const requestsRouter = require('./routes/requests.route');
const usersRouter = require('./routes/users.route');

const app = express();
app.use(express.json());
const port = process.env.MYAPP_PORT;

app.use('/adress', adressRouter);
app.use('/products', productsRouter);
app.use('/requests', requestsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Rodando na porta ${port}!`));