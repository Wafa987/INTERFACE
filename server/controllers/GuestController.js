// Récupérer le modèle
const User = require("../models/User");
// Permet de chiffrer le mot de passe avant l'enrgistrement dans la base de données
const bcrypt = require("bcrypt");
// Json Web Token
const jwt = require("jsonwebtoken")

/* Inscription à l'application */
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

/* Se connecter à la base de donnée en utilisant l'email, le mot de passe 
et Json Web Token */
const Login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      res.status(403).json({ error: "L'utilisateur n'existe pas" });
    } 
    else {
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          console.log(result)
          // Créer un Json Web Token 
          token = jwt.sign(
            { id: user._id, username: user.email, type: "user" },
            // Récupérer le token d'authentification dans le fichier env
            process.env.AUTH_TOKEN,  
            {} 
          ); 
          // Retourner les données et le Token au client
          res.status(200).json({ user: {user_id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name } , data: token });
        } else
          // Mot de passe incorrecte
          res.status(403).json({ error: "Mot de passe incorrect" });
        }
      );
    }
  } catch (error) {  
    console.log(error);
    res.status(500).json({ error: "Erreur inconnue" });
  }
};   

module.exports = { Register, Login };
