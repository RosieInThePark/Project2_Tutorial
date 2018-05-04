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

/* GET users listing. */
router.get('/', function(req, res, next){
  //그냥 board/로 접속할 경우 전체 목록 표시로 리다이렉팅
  res.redirect('/board/list/1');
});

router.get('/list/:page', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    // Use the connection
    var sqlForSelectList = "SELECT idx, creator_id, title, hit FROM board";
    connection.query(sqlForSelectList, function(err, rows) {
      if (err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows));

      res.render('list', { title: '2014722030 Hyunah Park 게시판 전체 글 조회', rows: rows });
      connection.release();

      //Don't use the connection here, it has been returned to the pool.
    });
  });
});

//글쓰기 화면 표시 GET
router.get('/write', function(req, res, next) {
  res.render('write', {title : "2014722030 Hyunah Park 게시판 글 쓰기"});
});

//글쓰기 로직 처리 POST
router.post('/write', function(req,res,next){
  var creator_id = req.body.creator_id;
  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.passwd;
  var datas = [creator_id, title, content, passwd];

  pool.getConnection(function(err, connection) {
    //Use the connection
    var sqlForInsertBoard = "insert into board(creator_id, title, content, passwd) values(?,?,?,?)";
    connection.query(sqlForInsertBoard, datas, function(err, rows){
      if(err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows));

      res.redirect('/board');
      connection.release();

      //Don't use the connection here, it has been returned to the pool.
    });
  });
});

//글조회 로직 처리 GET
router.get('/read/:idx', function(req, res, next){
  var idx = req.params.idx;
  pool.getConnection(function(err, connection) {
    var sql = "select idx, creator_id, title, content, hit from board where idx=?";

    connection.query(sql,[idx], function(err, row){
      if(err) console.error(err);

      console.log("1개 글 조회 결과 확인 : ", row);
      res.render('read', {title : "2014722030 Hyunah Park 글 조회", row:row[0]});
      connection.release();
    });
  });
});


module.exports = router;
