require('express-async-errors');
require('dotenv').config();
const express = require('express');
const productsRouter = require('./routes/products.route');
// const adressRouter = require('./routes/adress.route');
// const requestsRouter = require('./routes/requests.route');
const usersRouter = require('./routes/users.route');

const port = process.env.MYAPP_PORT;

const app = express();
app.use(express.json());

// app.use('/requests', requestsRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => res.send('Hello DeliveryApp!'));

app.use((err, _req, res, _next) => {
  const { message } = err;
  res.status(500).json({ message });
});

app.listen(port, () => console.log(`Rodando na porta ${port}!`));