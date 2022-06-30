import pool from "../config/connectDB";
import e from "express";

let getAllUsers = async (req, res) => {
    const [users] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'ok',
        data: users
    })
}

let createUser = async (req, res) => {
    let {fname, lname, email, address} = req.body;

    if (!fname || !lname || !email || !address) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }

    await pool.execute('INSERT INTO users (first_name, last_name, email, address) VALUES (?, ?, ?, ?)', [fname, lname, email, address])

    return res.status(200).json({
        message: 'Tạo ok nha'
    })
}

let updateUser = async (req, res) => {
    let id = req.params.id;
    let {fname, lname, email, address} = req.body;
    if (!fname || !lname || !email || !address || !id) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    await pool.execute('UPDATE users SET first_name=?, last_name=?, email=?, address=? WHERE id=?', [fname, lname, email, address, id])
    console.log(req.body)
    return res.status(200).json({
        message: 'Sửa ok nha'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.status(200).json({
        message: 'Xoá ok nha'
    })
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}