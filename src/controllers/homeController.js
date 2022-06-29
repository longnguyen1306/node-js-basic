import connection from "../config/connectDB";

let getHomePage = (req, res) => {
   let data = [];
       connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            data = results
            return res.render('index', {dataUsers: JSON.stringify(data)});
        }
    );
}

module.exports = {
    getHomePage
}