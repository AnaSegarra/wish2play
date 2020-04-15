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
  folder: 'wish2play',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    const { id } = req.user;
    console.log('el file', file);
    cb(null, `userImg-${id}`);
  }
});

const uploader = multer({ storage: storage });

module.exports = uploader;
