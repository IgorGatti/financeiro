require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const createCrudRoutes = require('./routes/crudRoutes');
const User = require('./models/User');
const Categories = require('./models/Categories');
const { isAuthenticated } = require('./middleware/auth');

const app = express();

// PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'myapp',
    port: process.env.DB_PORT || 5432
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/index');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000 // = 14 days
    }
}));

// Middleware para disponibilizar user em todas as views
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Test database connection
pool.connect()
    .then(() => console.log('Conectado ao PostgreSQL'))
    .catch(err => console.error('Erro de conexão com PostgreSQL:', err));

// Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Outras rotas
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/users', isAuthenticated, createCrudRoutes(User, 'users'));
app.use('/categories', isAuthenticated, createCrudRoutes(Categories, 'categories'));

// Home route - deve vir depois das outras rotas
app.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});