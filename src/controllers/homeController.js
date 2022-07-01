import pool from "../config/connectDB";
import multer from 'multer';
import path from 'path';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index', {dataUsers: rows});
}

let getDetailUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    let {fname, lname, email, address} = req.body;
    await pool.execute('INSERT INTO users (first_name, last_name, email, address) VALUES (?, ?, ?, ?)', [fname, lname, email, address])
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    return res.render('update', {user: user[0]});
}

let updatetUser = async (req, res) => {
    let {fname, lname, email, address, id} = req.body;
    await pool.execute('UPDATE users SET first_name=?, last_name=?, email=?, address=? WHERE id=?', [fname, lname, email, address, id])
    console.log(req.body)
    return res.redirect('/');
}

//upload file
let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile')
}

let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        return res.send("Please select an image to upload");
    }
    res.send(`You have updated this image: <hr/> <img src="/images/${req.file.filename}" width="500px"/><hr/><a href="/upload">Upload another image</a>`);
}

let handleUploadMultiple = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.files) {
        return res.send("Please select an image to upload");
    }

    let result = "You have uploaded these images: <hr/>";
    const files = req.files;
    let index, len;

    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`
    }
    result += `<hr /> <a href="/upload">Upload more images</a>`;
    res.send(result);
}

module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    editUser,
    updatetUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultiple
}