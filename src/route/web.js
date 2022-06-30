import express from "express";
import homeController from '../controllers/homeController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/user/:id', homeController.getDetailUser);
    router.post('/create-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/update-user', homeController.updatetUser);

    return app.use('/', router);
}

module.exports = initWebRoute;