const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const checkAuth = require('./middlewares/checkAuth');

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const accountingForLeaveRoutes = require('./routes/accountingForLeaveRoutes');
app.use('/accountingForLeave', checkAuth, accountingForLeaveRoutes);

const staffRoutes = require('./routes/staffRoutes');
app.use('/staff', checkAuth, staffRoutes);

app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard');
});
app.get('/register', (req, res) => {
    res.render('register'); // Express автоматично шукає файл register.ejs у папці views
});
app.get('/info', (req, res) => {
    res.render('info'); // Express автоматично шукає файл register.ejs у папці views
});
app.get('/brigades', (req, res) => {
    res.render('brigades'); // Express автоматично шукає файл register.ejs у папці views
});
app.get('/air', (req, res) => {
    res.render('air'); // Express автоматично шукає файл register.ejs у папці views
});
app.get('/navy', (req, res) => {
    res.render('navy'); // Express автоматично шукає файл register.ejs у папці views
});
app.get('/application', (req, res) => {
    res.render('application'); // Express автоматично шукає файл register.ejs у папці views
});



app.get('/', (req, res) => {
    if (req.session.token) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/auth/login');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
