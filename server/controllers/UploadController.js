const multer = require("multer");
const path = require("path");

// Définir l'endroit ou stocker les images
const storage = multer.diskStorage({
  destination: "./public/medias/",
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

/* Mettre en ligne l'image */
const upload = multer({
  storage: storage,
}).single("image");

/* Permet d'envoyer un fichier */
const UploadFile = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send("File upload unsuccessfull");
    } else {
      res.send("File upload successfull");
    }
  });
};

module.exports = { UploadFile };
