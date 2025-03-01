import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"uploads/");
  },
  filename: (req,file,cb) => {
    const fn = Date.now() + '-' + Math.round(Math.random() * 1000000);
    cb(null,fn + path.extname(file.originalname));
  }
});
const fileFilter = (req,file,cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error("Only image files are allowed!"),false);
    }
    cb(null,true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;