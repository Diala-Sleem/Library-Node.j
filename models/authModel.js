const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//--------------------------//

const schemaAuth = mongoose.Schema({
  fullName: {
    type: String,
    minlength: 3,
    required: [true, "Please enter a username"],
  },
  email: {
    type: String,
    //unique: true,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    //minLength: [8, "Minimum password length is 8"],
  },
});
//--------------------------//
let User = mongoose.model("user", schemaAuth);
let url = "mongodb://localhost:27017/library";

exports.registerFunctionModel = (fullName, email, password) => {
  //test email if exist (true go to login) (false add this user to users collection)
  //
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })

      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("email is used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })

      .then((hashPassword) => {
        let user = new User({
          fullName: fullName,
          email: email,
          password: hashPassword,
        });
        return user.save({});
      })

      .then(() => {
        mongoose.disconnect();
        resolve("user is successfully registered !");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

//----------------------------------------------------------------
exports.loginFunctionModel = (email, password) => {
  //test email if exist (true go to login) (false add this user to users collection)
  //
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })

      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((verify) => {
            if (verify) {
              mongoose.disconnect();
              resolve(user._id);
            } else {
              mongoose.disconnect();
              reject("invalid password");
            }
          });
        } else {
          mongoose.disconnect();
          reject("we don't have this user in the database");
        }
      }).catch(() => {reject(err)})
  });
};
