const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: function (req, file, cb) {
    if (req.params.game) {
      cb(null, 'wish2play/games');
    } else {
      cb(null, 'wish2play/users');
    }
  },
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    console.log('image file', file);
    console.log('for', req.params);
    if (req.params.game) {
      cb(null, file.originalname);
    } else {
      const { id } = req.user;
      cb(null, `userImg-${id}`);
    }
  }
});

const uploader = multer({ storage: storage });

module.exports = uploader;
