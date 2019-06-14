const mongoose      = require('mongoose'),
passport            = require('passport'),
User                = require('../dbconfig/models/user');

module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'Все поля обязательны'}); //err code
    }
    passport.authenticate('local', async function(err, user, info) {
        if(err) {
            return res.status(404).send(err); //err code
        }
        if(user) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
            })
            return res.status(200).send({message: 'its ok'});
        } else {
            return res.status(401).send(info); //err code
        }
    })(req, res);
}

module.exports.registration = async function(req, res) {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({message: 'Все поля обязательны'}); //err code
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
        return res.status(404).send(err); //err code
    })
};