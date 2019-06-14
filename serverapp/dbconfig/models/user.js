const mongoose      = require('mongoose')
bcrypt              = require('bcrypt'),
saltRounds          = 10;

UserSchema = new mongoose.Schema({
    username: String,
    createdDate: Date,
    password: String
  });
  
//   UserSchema.methods.setPassword = function(password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//   };

UserSchema.methods.setPassword = function(password) {
    return bcrypt.hash(password, saltRounds)
        .then(hash=> {
            return this.password = hash;
        })
        .catch(err=> {
            console.log(err);
        });
};
  
//   UserSchema.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
//   };

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
        .then(res=> {
            return res;
        })
        .catch(err=> {
            console.log(err);
        });
};
  

  //var User  = mongoose.model('User', UserSchema);

  module.exports = mongoose.model('User', UserSchema);