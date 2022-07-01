import express from "express";
import homeController from '../controllers/homeController'

import multer from 'multer';
import path from "path";
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage, fileFilter: imageFilter});
let upload1 = upload.array('images', 3);

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/user/:id', homeController.getDetailUser);
    router.post('/create-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/update-user', homeController.updatetUser);

    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-file-handle', upload.single('profile_pic'), homeController.handleUploadFile);
    router.post('/upload-multiple-file-handle', (req, res, next) => {
        upload1(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            } else {
                next();
            }
        })
    } , homeController.handleUploadMultiple);

    return app.use('/', router);
}

module.exports = initWebRoute;