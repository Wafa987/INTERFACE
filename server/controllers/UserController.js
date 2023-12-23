const mongoose = require("mongoose");
const User = require("../models/User");

const bcrypt = require("bcrypt");
// Mise à jour de l'utilisateur
const UpdateUser = async (req, res) => {
  try {
    const filter = {_id: new mongoose.Types.ObjectId(req.params.id) }
    await User.findOne(filter).then((user) => {
      if(!user) {
        console.log("Utilisateur introuvable");
        return;
      } else { 
        user.password = req.body.password
        return user.save();
      }
    }).then((update) => {
      User.findOneAndUpdate(filter, req.body)
      res.sendStatus(200)
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un utilisateur
const DeleteUser = async (req, res) => {
  try {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    await User.findOneAndRemove(filter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs
const GetAll = async (req, res) => {
  try {
    let result = await User.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un seul utilisateur
const GetOne = async (req, res) => {
  try {
    const user = req.session.user;
    const filter = { 
      _id: new mongoose.Types.ObjectId(user._id) 
    }
    let result = await User.findOne(filter);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Exporter le module pour etre visible dans le même dossier
module.exports = {UpdateUser, GetAll, GetOne, DeleteUser };
