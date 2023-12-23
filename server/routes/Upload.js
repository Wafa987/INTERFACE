const express = require('express')
const UploadController = require('../controllers/UploadController')
const UploadRouter = express.Router()

// Uploader un fichier
UploadRouter.post('/', UploadController.UploadFile)
 
// Exporter le module
module.exports = UploadRouter