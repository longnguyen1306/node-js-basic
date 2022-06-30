import express from "express";
import APIController from '../controllers/apiController'

let router = express.Router();

const initApiRoute = (app) => {
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user', APIController.createUser);
    router.put('/update-user/:id', APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);

    return app.use('/api/v1/', router);
}

module.exports = initApiRoute;