const passport      = require('passport'),
User                = require('../dbconfig/models/user'),
multer              = require('multer'),
fs                  = require('fs');

var dir = './dist/CRM/assets/img/users_avatar/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    if (!fs.existsSync(dir)){ //Проверяем существует ли дирректория, если нет создаем ее
        fs.mkdirSync(dir);
    }
      cb(null, dir)
    },
    filename: function (req, file, cb) {
        var format = file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, req.user._id + '-1.' + format)
    }
});

var upload = multer({storage: storage}).single('photo');

module.exports.profile = function(req, res) { //Нужно ли отправлять на сервер пустыми поля?
    return res.status(200).send(
        {
            Name: req.user.Name || '',
            Surname: req.user.Surname || '',
            Patronymic: req.user.Patronymic || '',
            birthDate: req.user.birthDate || '',
            tel: req.user.tel || '',
            email: req.user.username,
            img: req.user.img || 'assets/img/logotype.svg' //Если статус req.user.img 404, нужно заменить на лого
        }
    );
}

module.exports.update = function(req, res) {
    var data = req.body;
    var format = data.img.split('.')[data.img.split('.').length - 1];
    if ( data.img.includes(req.user._id + '-1') ) { //Если нажали сохранить , удаляем ид.жпг, переминовываем -1.жпг и изминяем путь img
        if (fs.existsSync(dir + req.user._id + '.' + format)) {  // Проверяем есть ли старый файл
            fs.unlinkSync(dir + req.user._id + '.' + format); //Удаляем старый файл 
        } 
        fs.rename(dir + req.user._id + '-1.' + format, dir + req.user._id + '.' + format, function(err) { //Переминовываем файл
            if ( err ) return console.log('ERROR: ' + err);
        });
        data['img'] = data.img.replace(req.user._id + '-1', req.user._id); //Изменил путь к файлу
    }
     
    data['username'] = req.body.email;
    User.findByIdAndUpdate(req.user._id, data, {new: true}, function(err, doc) {
        if (err) return res.status(500).send({message: 'Не удалось изменить профиль'});
        return res.status(200).send(doc);
    })
}

module.exports.img = function(req, res) {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path.replace(/\\/g, "/").replace('dist/CRM/', '')
        return res.status(200).send({path: path}); 
    }); 
}
