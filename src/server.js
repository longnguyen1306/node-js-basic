import express from "express";
import configViewEngine from "./config/viewEngine";
require('dotenv').config();
import initWebRoute from './route/web';
import initApiRoute from './route/api';
var morgan = require('morgan');

const app = express()
const port = process.env.PORT || 8080

app.use((req, res, next) => {
    console.log(req.method);
    next();
})

app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initApiRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404')
})


app.listen(port, () => {
    console.log('Server Express Running On Port: ', port)
})