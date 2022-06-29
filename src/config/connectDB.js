import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    database: 'node_basic'
});

// connection.query(
//     'SELECT * FROM users',
//     function (err, results, fields) {
//         console.log(results);
//     }
// );

export default connection;