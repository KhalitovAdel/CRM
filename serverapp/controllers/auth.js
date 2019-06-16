const passport      = require('passport'),
User                = require('../dbconfig/models/user'),
CryptoJS            = require("crypto-js"),
multer              = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './img228/')
    },
    filename: function (req, file, cb) {
        var format = file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage}).single('photo');

function encr(phrase, secret) {
    return CryptoJS.AES.encrypt(JSON.stringify(phrase), secret).toString();
}

module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
        return res.status( 500 ).send({message: 'Все поля обязательны'}); //err code
    }
    passport.authenticate('local', async function(err, user, info) {
        if(err) {
            return res.status( err.status || 500 ).render('error', {message: err.message,error: {}}); //err code
        }
        if(user) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
            })
            return res.status(200).send( 
                {data: encr({email: user.username} , 'secret secret secret secret')}
                );
        } else {
            return res.status(404).send(info); //err code
        }
    })(req, res);
}

module.exports.registration = async function(req, res) {
    if(!req.body.email || !req.body.password) {
        return res.status(500).send({message: 'Все поля обязательны'}); //err code
    }
    var user = new User();

    user.username = req.body.email;
    user.createdDate = new Date;
    user.password = await user.setPassword(req.body.password);
    user.save()
    .then(data=> {
        return res.status(200).send(data); //err code
    })
    .catch(err=> {
        return res.status(err.status || 500).render('error', {message: err.message,error: {}}); //err code
    })
};

module.exports.logout = function(req, res) {
    req.session.destroy();
    res.clearCookie("_dvparm").status(200).send(); //Обязательно нужно что то оптарвлять send чтобы удалились куки и локал
}

module.exports.submitRegister = function(req, res) {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        console.log(req.user)
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
    }); 
}