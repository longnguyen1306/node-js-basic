import express from "express";
import configViewEngine from "./config/viewEngine";
require('dotenv').config();
import initWebRoute from './route/web'
// import connection from "./config/connectDB";

const app = express()
const port = process.env.PORT || 8080

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log('Server Express Running On Port: ', port)
})