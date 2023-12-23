const mongoose = require("mongoose");
const Message = require("../models/Message");


const SendMessage = async (req, res) => {
  try {
      const msg = new Message(req.body);
      console.log()
      await msg.save();
      console.log("test")
      // Émettez un événement "newMessage" à tous les clients connectés
      res.status(200).json(msg);
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
  }
}

// Permet d'envoyer un message instantané
const SendNoSocketMessage = async (req, res) => {
  try {
        const usr = new User(req.body);
        usr.save();
        res.status(200).json(usr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un message instantané
const DeleteMessage = async (req, res) => {
  try {
    console.log(req.params.id)
    const filter = { 
      _id: new mongoose.Types.ObjectId(req.params.id) 
    }
    await Message.findOneAndDelete(filter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la conversation entre deux utilisateurs
const GetConversation = async (req, res) => {
  try {
    const filter = { sender_id: req.params.sender_id,
                     receiver_id: req.params.receiver_id};

    await User.findOneAndRemove(filter); 
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la conversation entre deux utilisateurs
const GetAll = async (req, res) => {
  try {
    let result = await Message.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un utilisateur grâce à son identifiant de document
const GetOne = async (req, res) => {
  try {
    let filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    let result = await User.findOne(filter);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Exporter les methodes du module
module.exports = { SendMessage, DeleteMessage, GetConversation, GetOne, GetAll};
