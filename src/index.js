const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('express-async-errors');

dotenv.config();

const app = express()

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://www.app.com.br',
]

// habilita cors
app.use(cors({
  origin: function (origin, callback) {
    let allowed = true

    // mobile app
    if (!origin) allowed = true

    if (!allowedOrigins.includes(origin)) allowed = false

    callback(null, allowed)
  }
}));

// habilita server pra receber dados Json
app.use(express.json());

//definindo rotas
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'))
app.use('/requests', require('./routes/requests'))

// executando o servidor
const port = process.env.PORT || 5050;
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) });
