const express     = require('express'),
app               = express(),
db                = require('./serverapp/dbconfig/index');

//app.use('/', express.static(__dirname + '/dist/cleanupCRM/'));
//app.use('/', router);
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, '/dist/cleanupCRM/index.html'));
// });

app.get('/', function (req, res) {
    res.send('Hello World123!');
});

const port = process.env.PORT || 3001;
db.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(port, function () {
    console.log(`Работаем на ${port} порту!`);
  });
});