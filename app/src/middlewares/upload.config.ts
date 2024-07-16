import multer from 'multer';
import path from 'path';


const storage = (folder) => multer.diskStorage({
    destination: `./uploads/${folder}/`,
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
const fileFilter = (req, file, cb) => {
  checkFileType(file, cb);
};

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

export const uploadAvatar = multer({ 
    storage: storage('avatars'), 
    fileFilter: fileFilter ,
    limits: { fileSize: 2000000 } //2MB Limit
  });

export const uploadGallery = multer({ 
    storage: storage('galleries'), 
    fileFilter: fileFilter ,
    limits: { fileSize: 2000000 } //2MB Limit
  });

