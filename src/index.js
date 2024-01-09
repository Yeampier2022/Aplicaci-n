const express = require('express');
const morgan = require('morgan');
const  engine  = require('express-handlebars');
const path = require('path');
const passport = require('passport')
const MySQLStore = require('express-mysql-session')
const flash = require('connect-flash');
const session = require('express-session')
const {database} = require('./key')


// initializations

const app = express();
require('./lib/passport')

// settings

app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')


// Minddleawares
app.use(session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    next();
}
)
// Routes
app.use(require('./routes'));
app.use(require('./routes/authetication'))
app.use('/links', require('./routes/links'))



// public
app.use(express.static(path.join(__dirname, 'public')))
// starting the serve
app.listen(app.get('port'), () => {
    console.log(`server en port:`, app.get('port'))
})

