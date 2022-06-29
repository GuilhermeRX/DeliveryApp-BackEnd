const express = require('express');
require('dotenv').config();
require('express-async-errors');
// const adressRouter = require('./routes/adress.route');
// const productsRouter = require('./routes/products.route');
// const requestsRouter = require('./routes/requests.route');
const usersRouter = require('./routes/users.route');

const port = process.env.MYAPP_PORT;

const app = express();
app.use(express.json());

// app.use('/adress', adressRouter);
// app.use('/products', productsRouter);
// app.use('/requests', requestsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => res.send('Hello DeliveryApp!'));

app.use((err, _req, res, _next) => {
  const { message } = err;
  res.status(500).json({ message });
});

app.listen(port, () => console.log(`Rodando na porta ${port}!`));