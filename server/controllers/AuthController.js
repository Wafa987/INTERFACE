// Récupérer le modèle
const User = require("../models/User");
// Permet de chiffrer le mot de passe avant l'enrgistrement dans la base de données
const bcrypt = require("bcrypt");
// Json Web Token
const jwt = require("jsonwebtoken");

/* register to application */
const Register = async (req, res) => {
  try {
    const usr = new User(req.body);
    await usr.save().then((user) => {
      res.status(200).json(user);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

/* Create a session using SESSIONS */
const Login = async (req, res, next) => {
  try {
    // get email and hashed password
    let email = req.body.email;
    let password = req.body.password;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.status(401).json({ error: "User does not exist" });
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          req.session.regenerate(function (err) {
            if (err) next(err);
            // Save user in session to
            req.session.user = user;
            // Send the cookie to the server
            res.send("Logged in");
            // Save session
            req.session.save(function (err) {
              if (err) return
              next(err);
            });
          });
        }
        // Incorrect password
        else res.status(403).json({ error: "Mot de passe incorrect" });
      });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur inconnue" });
  }
};

// Logout
const Logout = async (req, res) => {
  console.log("Appel reussi")
  req.session = null;
  res.clearCookie("connect.sid");
  console.log("Je suis ici normalemnet")
  res.send("Your are logged out");
};

module.exports = { Register, Login, Logout };
