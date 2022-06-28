const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.MYAPP_PORT;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Rodando na porta ${port}!`));