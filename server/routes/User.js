const express = require('express')
const UserController = require('../controllers/UserController')
const UserRouter = express.Router()

// Routes de l'utilisateur
UserRouter.get('/get-user', UserController.GetOne)
UserRouter.put('/:id', UserController.UpdateUser)
UserRouter.delete('/:id', UserController.DeleteUser)
UserRouter.get('/', UserController.GetAll) 
 
// Exporter le module
module.exports = UserRouter   