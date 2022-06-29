import express from "express";
import configViewEngine from "./config/viewEngine";

const app = express()
const port = 3000

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('Server Express Running On Port: ', port)
})