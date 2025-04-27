require('dotenv').config();
const express = require('express');
const app = express();
const createCrudRoutes = require('./routes/crudRoutes');
const User = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// rota raiz
app.get('/', (req, res) => {
  res.redirect('/users');
});

// rotas
app.use('/users', createCrudRoutes(User, 'users'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});