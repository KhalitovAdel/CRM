const mongoose      = require('mongoose');

var state = {
    db: null
};

exports.connect = function (done) {
    if (state.db) {
        return done();
    }
    mongoose.connect('mongodb://localhost:27017/crm', {useCreateIndex: true, useNewUrlParser: true}, function (err, db) {
        if (err) {
            console.log('Ошибка запуска базы')
            return done(err);
        }
        state.db = db;
        console.log('Подключились к базе данных');
        done();
    });
};

conn = mongoose.connection;