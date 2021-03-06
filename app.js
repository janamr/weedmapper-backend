require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

const passportSetup = require("./passport/setup.js")

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allow cross origin resource sharing (API requests from other domains)
app.use(cors({
  // receive cookies from other domains
  credentials: true,
  // these are the domains I want cookies from
  origin: ["http://localhost:4200"]
}));
// session setup hsould coem after the CORS setup
app.use(session({
  secret: "blah",
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport setup should come after session setup
passportSetup(app);

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);

const plantPinRouter = require("./routes/plant-pin-router.js");
app.use("/", plantPinRouter);

const authRouter = require("./routes/auth-router.js");
app.use("/", authRouter);

app.use((req, res, next) => {
  res.sendFile(`${__dirname}/public/index.html`);
});


module.exports = app;

