const express   = require('express'),
passport        = require('passport'),
bodyParser      = require('body-parser'),
session         = require("express-session"),
MongoStore      = require('connect-mongo')(session),
cors            = require('cors'),
app             = express(),
rateLimit       = require("express-rate-limit"),
router          = require('./serverapp/routes/index'),
limiter         = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}),
helmet          = require('helmet');

var db          = require('./serverapp/dbconfig/index');

require('./serverapp/apps/security/passportjs/index')(passport);

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( session({
    secret: 'thisIsSecret',
    store: new MongoStore({
      mongooseConnection: db.freshConnect,
      collection: 'session'
    }),
    name : '_dvparm',
    resave: false,
    rolling: true,
    proxy: true,
    saveUninitialized: false,
    cookie : { httpOnly: true, secure : false, maxAge : ( 24 * 60 * 60 * 1000 * 5 ), }, 
}));

var originsWhitelist = [
    'http://localhost:4200',
    'http://xn--80apfeln.xn--p1ai',
    'https://xn--80apfeln.xn--p1ai',
    'http://localhost:3001'
];
var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
}
app.use(cors(corsOptions));

app.use( passport.initialize() );
app.use( passport.session() );

app.use( helmet() );

//app.use('/', express.static(__dirname + '/dist/cleanupCRM/'));
app.use( limiter );
app.use('/', router);
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, '/dist/cleanupCRM/index.html'));
// });

const port = process.env.PORT || 3001;
db.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(port, function () {
    console.log(`Работаем на ${port} порту!`);
  });
});