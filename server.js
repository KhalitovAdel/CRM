const express   = require('express'),
passport        = require('passport'),
bodyParser      = require('body-parser'),
session         = require("express-session"),
MongoStore      = require('connect-mongo')(session),
cors            = require('cors'),
app             = express(),
router          = require('./serverapp/routes/index');
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
    name : 'papapapapa',
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
//app.use('/', express.static(__dirname + '/dist/cleanupCRM/'));
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