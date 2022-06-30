import pool from "../config/connectDB";

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index', {dataUsers: rows});
}

let getDetailUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?',[id] )
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
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?',[id] )
    return res.render('update', {user: user[0]});
}

let updatetUser = async (req, res) => {
    let {fname, lname, email, address, id} = req.body;
    await pool.execute('UPDATE users SET first_name=?, last_name=?, email=?, address=? WHERE id=?', [fname, lname, email, address, id])
    console.log(req.body)
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    editUser,
    updatetUser
}