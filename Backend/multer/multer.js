import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // or wherever you want to store them
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// This handles form-data like: gymImages[], trainerImages[]
export const uploadFields = upload.fields([
  { name: 'gymImages', maxCount: 2 },
  { name: 'trainerImages', maxCount: 2 }
]);


