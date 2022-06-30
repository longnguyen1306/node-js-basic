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

module.exports = {
    getHomePage,
    getDetailUser
}