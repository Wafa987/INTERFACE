const express = require('express')
const EmailController = require('../controllers/EmailController')
const EmailRouter = express.Router()

// SendEmail, UpdateEmail, GetAll, GetUserEmails, GetOne, DeleteEmail 
EmailRouter.post('/send-email', EmailController.SendEmail)
EmailRouter.put('/:id', EmailController.UpdateEmail)
EmailRouter.get('/inbox', EmailController.GetInboxPaginated)
EmailRouter.get('/sent', EmailController.GetSentPaginated)
EmailRouter.get('/draft', EmailController.GetDraftPaginated)
EmailRouter.get('/all', EmailController.GetAll)
EmailRouter.get('/:email', EmailController.GetUserEmails)
EmailRouter.get('/:id', EmailController.GetOne)

// Exporter le router
module.exports = EmailRouter