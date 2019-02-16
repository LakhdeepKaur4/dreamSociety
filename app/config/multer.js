const multer = require('multer');
let { uploadImagePath } = require('./config');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../../../');    
    },
    filename: function(req, file, cb) {
    cb(null, new Date() + '_' + file.originalname);
    }
});

const fileFilter = (req,file,cb) =>  {
    if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
        cb(null,true);
    }else{ //reject a file
        cb(null,false)
    }
};

const fileUploadConfig = multer({
    storage:storage,
    // limits:{
    //     fileSize:1024 * 1024 * 5 //max file size 5mb
    // },
    // fileFilter:fileFilter
});

module.exports = fileUploadConfig;
