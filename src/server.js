import express from "express";
import configViewEngine from "./config/viewEngine";
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('Server Express Running On Port: ', port)
})