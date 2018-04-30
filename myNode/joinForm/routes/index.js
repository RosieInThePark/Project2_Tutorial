var express = require('express');
var router = express.Router();

/*Database(MySQL)*/
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'hYeon11mefatal17@'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query('SELECT * FROM board', function(err, rows) {
      if (err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows));

      res.render('index', { title: '2014722030 Hyunah Park test', rows: rows });
      connection.release();

      //Don't use the connection here, it has been returned to the pool.
    });
  });
});

module.exports = router;
